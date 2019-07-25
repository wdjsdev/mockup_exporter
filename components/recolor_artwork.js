/*
	Component Name: recolor_artwork
	Author: William Dowling
	Creation Date: 22 May, 2019
	Description: 
		loop the param color blocks to find the artwork
		that has the fill color of the given param color
		and apply the same fill color or graphic style
		to all of the artwork to match param block.
	Arguments
		none
	Return value
		success boolean

*/

function recolorArtwork()
{
	if(devMode)return;
	var result = true;

	var curBlock,curName;
	for(var x = uvParamLayer.pageItems.length - 1; x>=0; x--)
	{
		curBlock = uvParamLayer.pageItems[x];
		if(curBlock.name.indexOf("param") === -1)
		{
			curBlock.remove();
			continue;
		}
		curName = curBlock.name.replace("paramcolor-","");
		app.redraw();
		changeColor(curName,curBlock);
	}


	return result;


	function changeColor(name,src)
	{
		uvFile.selection = null;
		uvFile.defaultFillColor = makeNewSpotColor(name,"CMYK",BOOMBAH_APPROVED_COLOR_VALUES[name]).color;
		app.executeMenuCommand("Find Fill Color menu item");

		try
		{
			var gs = uvFile.graphicStyles[name];
			var curSel,item;
			for(var cc=0,len=uvFile.selection.length;cc<len;cc++)
			{
				curSel = uvFile.selection[cc];
				if(curSel.typename === "PathItem")
				{
					item = curSel;
				}
				else if(curSel.typename === "CompoundPathItem" && curSel.pathItems.length)
				{
					item = curSel.pathItems[0];
				}
				if(item)
				{
					gs.applyTo(item);
				}
				item = undefined;
			}
		}
		catch(e)
		{
			uvFile.defaultFillColor = src.fillColor;
		}
	}
}