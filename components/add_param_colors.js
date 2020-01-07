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
		//sort the array by the sequence number of placeholder swatches
		//for example: C1 before C2, but C2 should come before C11
		//trim the C, convert to int, then compare the int for reliable sorting
		result = result.sort(function compareFunction(a,b)
		{
			a = parseInt(a.name.replace("C",""));
			b = parseInt(b.name.replace("C",""));
			if(a < b)
			{
				return -1;
			}
			if(a > b)
			{
				return 1;
			}
			return 0;
		});
		
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



