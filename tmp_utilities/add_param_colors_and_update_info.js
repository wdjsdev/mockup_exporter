function addParamColors()
{
	var colorValues = BOOMBAH_APPROVED_COLOR_VALUES;

	var placeholderPrefixLetter;

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
		var curParam,curSwatch,curCName;
		var abIndex = aB.getActiveArtboardIndex;
		var pat = /[cb][\d]{1,2}/i;

		for(var x=0,len=swatches.length;x<len;x++)
		{
			if(pat.test(swatches[x].name))
			{
				makeParamBlock(swatches[x].name,x);
				result++;
			}
		}

		function makeParamBlock(color,index)
		{
			var top, dim = 5,left = aB[abIndex].artboardRect[0] - dim;
			curSwatch = makeNewSpotColor(color,"CMYK",colorValues[curCName]);
			top = aB[abIndex].artboardRect[1] - (index * dim);
			curParam = paramLayer.pathItems.rectangle(top, left, dim, dim);
			curParam.name = "paramcolor-" + curCName;
			curParam.fillColor = curSwatch.color;
			curParam.stroked = false;
		}
	}

	

	app.doScript("cleanup_swatches","cleanup_swatches");
	
	for(var x=0,len = layers.length;x<len;x++)
	{
		if(isTemplate(layers[x]))
		{
			centerArtboardInWindow(layers[x]);
			processCurLayer(layers[x]);
		}
	}

	getPlaceholderSwatches();

	
	// for(var x=0;x<numOfPlaceholderColors;x++)
	// {
	// 	curCName = placeholderPrefixLetter + (x+1);
	// 	curSwatch = makeNewSpotColor(curCName,"CMYK",colorValues[curCName]);
	// 	top = aB[abIndex].artboardRect[1] - (x * dim);
	// 	curParam = paramLayer.pathItems.rectangle(top, left, dim, dim);
	// 	curParam.name = "paramcolor-" + curCName;
	// 	curParam.fillColor = curSwatch.color;
	// 	curParam.stroked = false;
	// }


}



