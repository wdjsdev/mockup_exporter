/*
	Component Name: recolor_display_blocks
	Author: William Dowling
	Creation Date: 16 May, 2019
	Description: 
		search the database to determine whether any
		non-artwork display colors are present and
		if so, apply the appropriate color 
	Arguments
		none
	Return value
		success boolean

*/

function recolorDisplayBlocks()
{
	var result = true;
	var curData = mockupExporterGarmentData[curGarmentCode];
	var index,paramBlock;
	if(curData)
	{
		for(var x=0,len=curData.updateDisplay.length;x<len;x++)
		{
			recolorBlock(curData.updateDisplay[x].name,curData.updateDisplay[x].seq)
		}
		if(curData.flipCollars)
		{
			flipCollars();
		}
	}

	return result;


	function flipCollars()
	{
		for(var x=0,len=uvArtLayer.pageItems.length;x<len;x++)
		{
			if(uvArtLayer.pageItems[x].name.indexOf("ollar") > -1)
			{
				uvArtLayer.pageItems[x].rotate(180);
			}
		}
	}

	function recolorBlock(name,index)
	{
		if(index === -1)
		{
			index = 0;
		}
		else
		{
			index = uvParamLayer.pageItems.length - index - 1;
		}
		try
		{
			var display = uvArtLayer.pageItems[name];
			paramBlock = uvParamLayer.pageItems[index];
			display.fillColor = paramBlock.fillColor;
		}
		catch(e)
		{
			log.e("Failed to recolor the " + name + " display.");
			errorList.push("The UV Map file is either missing a \"display block\" called: " + name + ", or a param block called: C" + index + ".");
			result = false;
		}
	}
}