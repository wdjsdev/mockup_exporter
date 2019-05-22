#target Illustrator
function setupUv()
{
	var valid = true;

	if(!app.documents.length)
	{
		alert("You must have a blank uv map template file open. Please try again.");
		return;
	}

	//Production Utilities
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	
	//Dev Utilities
	// eval("#include \"/Volumes/Macintosh HD/Users/will.dowling/Desktop/automation/utilities/Utilities_Container.js\"");
	// eval("#include \"/Volumes/Macintosh HD/Users/will.dowling/Desktop/automation/utilities/Batch_Framework.js\"");
	

	if(user === "will.dowling")
	{
		logDest.push(File(desktopPath + "/automation/logs/mockup_exporter_dev_log.txt"));
	}
	else
	{
		logDest.push(File("/Volumes/Customization/Library/Scripts/Script Resources/Data/.script_logs/mockup_exporter_log.txt"));
	}

	var devComponents = desktopPath + "/automation/mockup_exporter/components";
	var prodComponents = "/Volumes/Customization/Library/Scripts/Script Resources/components/mockup_exporter"

	var compFiles = includeComponents(devComponents,prodComponents,false);
	if(compFiles && compFiles.length)
	{
		for(var x=0,len=compFiles.length;x<len;x++)
		{
			try
			{
				eval("#include \"" + compFiles[x].fsName + "\"");
			}
			catch(e)
			{
				errorList.push("Failed to include the component: " + compFiles[x].name);
				log.e("Failed to include the component: " + compFiles[x].name + "::System Error Message: " + e + "::System Error Line: " + e.line);
				valid = false;
			}
		}
	}
	else
	{
		valid = false;
		errorList.push("Failed to find any of the necessary components for this script to work.");
		log.e("Failed to include any components. Exiting script.");
	}

	if(!valid)
	{
		printLog();
		return;
	}


	function extractProductionColors()
	{
		var valid = true;
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		var obj = {};
		var arr = [];

		var prodColorLay = findSpecificLayer(layers,"production colors");
		if(!prodColorLay)
		{
			prodColorLay = layers.add();
			prodColorLay.name = "production colors";
		}
		prodColorLay.zOrder(ZOrderMethod.SENDTOBACK);

		function extractProdColor(colorName,type)
		{
			if(type === "fill")
			{
				docRef.defaultFillColor = swatches[colorName].color;
				app.executeMenuCommand("Find Fill Color menu item");
			}

			if(type === "stroke")
			{
				docRef.defaultStrokeColor = swatches[colorName].color;
				app.executeMenuCommand("Find Stroke Color menu item");
			}

			if(!docRef.selection.length)
			{
				return;
			}
			moveSelectionToLayer(colorName);
		}

		function moveSelectionToLayer(colorName)
		{
			prodColorLay.locked = false;
			app.executeMenuCommand("cut");
			app.executeMenuCommand("pasteInPlace");
			app.executeMenuCommand("group");
			docRef.selection[0].name = colorName;
			docRef.selection[0].moveToBeginning(prodColorLay);
			docRef.selection = null;
			prodColorLay.locked = true;
		}
		
		for(var x=0,len=swatches.length;x<len;x++)
		{
			if(BOOMBAH_PRODUCTION_COLORS.indexOf(swatches[x].name)>-1)
			{
				extractProdColor(swatches[x].name,"fill");
				extractProdColor(swatches[x].name,"stroke");
			}
			app.redraw();
		}
	}

	function addGuides()
	{
		var replaceStr = /^[a-z0-9\.]*\s/i;

		var guidesLay = findSpecificLayer(layers,"Guides");

		var artLay = findSpecificLayer(layers,"Art");
		if(!artLay)
		{
			artLay = layers.add();
			artLay.name = "Art";
		}

		var paramLay = findSpecificLayer(layers,"paramcolors");
		if(!paramLay)
		{
			paramLay = layers.add();
			paramLay.name = "paramcolors";
		}

		function drawGuide(item)
		{
			var newGuide = guidesLay.pathItems.rectangle(item.top,item.left,item.width,item.height);
			newGuide.filled = false;
			newGuide.stroked = false;
			newGuide.name = item.name.replace(replaceStr,"");
			newGuide.moveToBeginning(guidesLay);
			item.remove();
		}

		docRef.selection = null;
		guidesLay.hasSelectedArtwork = true;
		for(var x = docRef.selection.length-1;x>=0;x--)
		{	
			drawGuide(docRef.selection[x]);
		}
	}
	
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;

	log.h("Beginning Setup UV Map Template Script.")

	createCleanupSwatchesAction();

	getGarmentData();
	if(valid)
	{
		extractProductionColors();
		app.redraw();
		addGuides();
		app.doScript("cleanup_swatches","cleanup_swatches");
	}

	removeAction("cleanup_swatches");

	printLog();
	return valid;
}
setupUv();