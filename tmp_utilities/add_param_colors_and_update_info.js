function addParamColors()
{
	var colorValues = BOOMBAH_APPROVED_COLOR_VALUES;

	app.executeMenuCommand("fitin");

	try
	{
		mockLay.layers["paramcolors"].remove();
	}
	catch(e){};

	var paramLayer = mockLay.layers.add();
	paramLayer.name = "paramcolors";

	function getPlaceholderSwatches()
	{
		var result = 0;
		var pat = /[cb][\d]{1,2}/i;

		for(var x=0,len=swatches.length;x<len;x++)
		{
			if(pat.test(swatches[x].name))
			{
				result++;
			}
		}

		return result;
	}

	app.doScript("rmswatches","rmswatches");
	
	for(var x=0,len = layers.length;x<len;x++)
	{
		if(isTemplate(layers[x]))
		{
			centerArtboardInWindow(layers[x]);
			processCurLayer(layers[x]);
		}
	}

	var numOfPlaceholderColors = getPlaceholderSwatches();

	var curParam,curSwatch,curCName;
	for(var x=0;x<numOfPlaceholderColors;x++)
	{
		curCName = "C" + (x+1);
		curSwatch = makeNewSpotColor(curCName,"CMYK",colorValues[curCName]);
		curParam = paramLayer.pathItems.rectangle(x * -5, aB[aB.getActiveArtboardIndex()].artboardRect[0] - 5,5,5);
		curParam.name = "paramcolor-" + curCName;
		curParam.fillColor = curSwatch.color;
		curParam.stroked = false;
	}


}



