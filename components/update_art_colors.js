/*
	Component Name: update_art_colors
	Author: William Dowling
	Creation Date: 14 August, 2018
	Description: 
		locate the paramcolor blocks and update the
		placeholder colors in the document to match
		the paramcolors given
	Arguments
		none
	Return value
		success boolean

*/

function updateArtColors()
{
	var paramLayer = findSpecificLayer(uvFile,"paramcolors");
	if(!paramLayer)
	{
		errorList.push("Failed to find the paramcolors layer in the UV Map File.");
		return false;
	}
	var paramColors = paramLayer.pageItems;

	var curPlaceHolderColor,curColorBlock,tmpBlock,curSwatch;
	for(var x=0,len=paramColors.length;x<len;x++)
	{
		uvFile.selection = null;
		curColorBlock = paramColors[x];
		curPlaceHolderColor = curColorBlock.name.substring(curColorBlock.name.indexOf("-C")+1,curColorBlock.name.length);
		curSwatch = makeNewSpotColor(curPlaceHolderColor,"CMYK",{"cyan":0,"magenta":0,"yellow":0,"black":0});
		tmpBlock = uvFile.pathItems.rectangle(0,0,5,5);
		tmpBlock.fillColor = curSwatch.color;
		tmpBlock.selected = true;
		app.executeMenuCommand("Find Fill Color menu item");
		uvFile.defaultFillColor = curColorBlock.fillColor;
		// changeColors(uvSwatches[curColorBlock.fillColor.name]);
		tmpBlock.remove();
		// changeColors(uvFile.selection,uvSwatches[curColorBlock.fillColor.spot.name]);

	}

	function changeColors(swatch)
	{
		uvFile.defaultFillColor = swatch.color;
	}

	// function changeColors(swatch)
	// {
	// 	function createApplySwatchAction()
	// 	{
	// 		var swatchHexValue = asciiToHex(swatch.name);
	// 		var len = swatchHexValue.length;
	// 		var dest = new Folder(homeFolderPath + " /Documents");
	// 		var actionFile = new File(dest + "/merge_swatches.aia" );

	// 		var actionString =
	// 		[
	// 			"/version 3",
	// 			"/name [ 12",
	// 			"4170706c7920537761746368",
	// 			"]",
	// 			"/isOpen 1",
	// 			"/actionCount 1",
	// 			"/action-1 {",
	// 			"/name [ 5",
	// 			"6d65726765",
	// 			"]",
	// 			"/keyIndex 0",
	// 			"/colorIndex 0",
	// 			"/isOpen 1",
	// 			"/eventCount 1",
	// 			"/event-1 {",
	// 			"/useRulersIn1stQuadrant 0",
	// 			"/internalName (ai_plugin_swatches)",
	// 			"/localizedName [ 8",
	// 			"5377617463686573",
	// 			"]",
	// 			"/isOpen 0",
	// 			"/isOn 1",
	// 			"/hasDialog 0",
	// 			"/parameterCount 1",
	// 			"/parameter-1 {",
	// 			"/key 1937204072",
	// 			"/showInPalette 4294967295",
	// 			"/type (ustring)", 
	// 			"/value [ " + len,
	// 			//this is the value to change for each swatch
	// 			swatchHexValue,
	// 			"]",
	// 			"}",
	// 			"}",
	// 			"}"
	// 		].join("\n");

	// 		actionFile.open("w");
	// 		actionFile.write(actionString);
	// 		actionFile.close();
			

	// 		app.loadAction(actionFile);

	// 	}

	// 	createApplySwatchAction();
	// 	app.doScript("merge","Apply Swatch");
	// 	try
	// 	{
	// 		app.unloadAction("Apply Swatch","");
	// 	}
	// 	catch(e){};

	// }

	// function changeColors(items,swatch)
	// {
	// 	for(var x=0,len = items.length;x<len;x++)
	// 	{
	// 		$.writeln("processing item: " + x);
	// 		dig(items[x]);
	// 	}

	// 	function dig(item)
	// 	{
	// 		if(item.typename === "PathItem")
	// 		{
	// 			item.fillColor = swatch.color;
	// 		}
	// 		else if(item.typename === "CompoundPathItem" && item.pathItems.length > 0)
	// 		{
	// 			item.pathItems[0].fillColor = swatch.color;
	// 		}
	// 		else if(item.typename === "GroupItem")
	// 		{
	// 			dig(item);
	// 		}
	// 	}
	// }
}