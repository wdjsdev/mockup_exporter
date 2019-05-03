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

	extractProductionColors();
	app.redraw();
	addGuides();

	app.doScript("rmswatches","rmswatches");
}
setupUv();