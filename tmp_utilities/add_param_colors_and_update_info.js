function test()
{
	var valid = true;
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");

	#include "~/Desktop/automation/utilities/boombah_swatch_color_values.js";

	function processCurDocument()
	{
		var docRef = app.activeDocument;
		app.executeMenuCommand("fitall");
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		// var mockLay = layers[0].layers["Mockup"];
		var mockLay = findSpecificLayer(layers[0],"Mockup");
		var infoLay = findSpecificLayer(layers[0],"Information");

		if(!mockLay || !infoLay)
		{
			errorList.push(layers[0].name);
			errorList.push("failed to find a necessary layer.");
			errorList.push("mockLay = " + mockLay);
			errorList.push("infoLay = " + infoLay);
		}

		var paramLayer = mockLay.layers.add();
		paramLayer.name = "paramcolors";

		function getData()
		{
			var result;

			var w = new Window("dialog","enter the data");
				var dsColorGroup = UI.group(w);
					var dsMsg = UI.static(dsColorGroup,"Drawstring: C");
					var dsInput = UI.edit(dsColorGroup,"6",10);
						dsInput.active = true;
				
				UI.hseparator(w,200);

				var paramInfoGroup = UI.group(w);
					var pgMsg = UI.static(paramInfoGroup,"How many C colors?");
					var pgInput = UI.edit(paramInfoGroup,"",10);

				UI.hseparator(w,200);

				var styleNumGroup = UI.group(w);
					var snMsg = UI.static(styleNumGroup,"Enter Style Number:");
					var snInput = UI.edit(styleNumGroup,"1000");

				UI.hseparator(w,200);

				var btnGroup = UI.group(w);
					var cancelBtn = UI.button(btnGroup,"Cancel",function()
					{
						valid = false;
						w.close();
					})
					var submit = UI.button(btnGroup,"Submit",function()
					{
						result = 
						{
							"dsColor": "C" + dsInput.text,
							"pcNum": parseInt(pgInput.text),
							"styleNum": snInput.text
						};
						w.close();
					})
			w.show();

			return result;
		}



		var data = getData();

		var drawstringDisplay = mockLay.pathItems.rectangle(-972,205,150,20)
		var cSwatch = makeNewSpotColor(data.dsColor,"CMYK",colorValues[data.dsColor]);
		drawstringDisplay.fillColor = cSwatch.color;
		drawstringDisplay.name = "Drawstring Display";

		var curParam,curSwatch,curCName;
		for(var x=0;x<data.pcNum;x++)
		{
			curCName = "C" + (x+1);
			curSwatch = makeNewSpotColor(curCName,"CMYK",colorValues[curCName]);
			curParam = paramLayer.pathItems.rectangle(x * -5, aB[0].artboardRect[0] - 5,5,5);
			curParam.name = "paramcolor-" + curCName;
			curParam.fillColor = curSwatch.color;
			curParam.stroked = false;
		}

		//update style number
		if(data.styleNum != "")
		{
			var styleNumRegEx = /_[\d]{3,4}/;
			var newStyleNum = "_" + data.styleNum;
			layers[0].name = layers[0].name.replace(styleNumRegEx,newStyleNum);
			var code = infoLay.textFrames["Garment Code"];
			alert(styleNumRegEx.test(code.contents));
			code.contents = code.contents.replace(styleNumRegEx,newStyleNum);
		}
		

	}

	function unStrokeDrawstring()
	{
		var docRef = app.activeDocument;
		var mockLay = findSpecificLayer(docRef.layers[0],"Mockup");

		var disp = mockLay.pageItems["Drawstring Display"];
		disp.stroked = false;
	}
	
	// processCurDocument();
	// batchInit(processCurDocument)
	batchInit(unStrokeDrawstring);
	// unStrokeDrawstring();
	if(errorList.length)
	{
		sendErrors(errorList);
	}
	

	
}
test();



