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
