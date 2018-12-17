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
	var doc = app.activeDocument;
	var paramLayer = findSpecificLayer(uvFile, "paramcolors");
	if (!paramLayer)
	{
		errorList.push("Failed to find the paramcolors layer in the UV Map File.");
		return false;
	}
	var paramColors = paramLayer.pageItems;

	var curPlaceHolderColorName, curColorBlock, tmpBlock, curSwatch, curGraphicStyle,curSelection;
	for (var x = 0, len = paramColors.length; x < len; x++)
	{
		uvFile.selection = null;

		curColorBlock = paramColors[x];
		curPlaceHolderColorName = curColorBlock.name.substring(curColorBlock.name.indexOf("-C") + 1, curColorBlock.name.length);
		curSwatch = makeNewSpotColor(curPlaceHolderColorName, "CMYK",
		{
			"cyan": 0,
			"magenta": 0,
			"yellow": 0,
			"black": 0
		});

		//check to see if a graphic style has been created for this placeholder color
		for (var gs = 0, len = doc.graphicStyles.length; gs < len; gs++)
		{
			if (doc.graphicStyles[gs].name.indexOf(curPlaceHolderColorName) > -1)
			{
				curGraphicStyle = doc.graphicStyles[gs];
			}
		}


		doc.selection = null;
		makeTmpBlock();
		app.executeMenuCommand("Find Fill Color menu item");
		if(curGraphicStyle)
		{
			for(var s = doc.selection.length-1;s>=0;s--)
			{
				curSelection = doc.selection[s];
				curGraphicStyle.applyTo(curSelection);
			}
		}
		else
		{
			uvFile.defaultFillColor = curColorBlock.fillColor;
		}
		tmpBlock.remove();

	}

	function makeTmpBlock()
	{
		tmpBlock = uvFile.pathItems.rectangle(0, 0, 5, 5);
		tmpBlock.fillColor = curSwatch.color;
		tmpBlock.selected = true;
	}

}