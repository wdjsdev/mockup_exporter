function addParamColors()
{
	var colorValues = BOOMBAH_APPROVED_COLOR_VALUES;

	app.executeMenuCommand("fitin");

	try
	{
		mockupLay.layers["paramcolors"].remove();
	}
	catch(e){};

	var paramLayer = mockupLay.layers.add();
	paramLayer.name = "paramcolors";

	function getPlaceholderSwatches()
	{
		var result = [];
		var pat = /[cb][\d]{1,2}/i;		

		for(var x=0,len=swatches.length;x<len;x++)
		{
			if(pat.test(swatches[x].name))
			{
				result.push(swatches[x]);
			}
		}
		result = result.sort();
		return result;
	}

	app.doScript("cleanup_swatches","cleanup_swatches");


	// var numOfPlaceholderColors = getPlaceholderSwatches();
	var placeholdersNeeded = getPlaceholderSwatches();

	var curParam,curSwatch,curCName;
	for(var x=0;x<placeholdersNeeded.length;x++)
	{
		curCName = placeholdersNeeded[x].name;
		curSwatch = makeNewSpotColor(curCName,"CMYK",colorValues[curCName]);
		curParam = paramLayer.pathItems.rectangle(x * -5, aB[aB.getActiveArtboardIndex()].artboardRect[0] - 5,5,5);
		curParam.name = "paramcolor-" + curCName.replace("B","C");
		curParam.fillColor = curSwatch.color;
		curParam.stroked = false;
	}


}



