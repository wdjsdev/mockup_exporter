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

	//first, delete any graphic styles that exist.
	//then replace them with graphic styles created
	//directly from the param blocks. this way we'll be
	//guaranteed to have the correct graphic styles
	for(var x = uvFile.graphicStyles.length-1;x>=0;x--)
	{
		uvFile.graphicStyles[x].remove();
	}

	//load the "create graphic style" action
	// createAction("graphic_style_from_selection",GRAPHIC_STYLE_FROM_SELECTION_ACTION_STRING);

	
	var curBlock,curName;
	for(var x = uvParamLayer.pageItems.length - 1; x>=0; x--)
	{
		app.selection = null;
		curBlock = uvParamLayer.pageItems[x];


		if(curBlock.name.indexOf("param") === -1)
		{
			curBlock.remove();
			continue;
		}

		curName = curBlock.name.replace("paramcolor-","");

		graphicStyleFromItem(curBlock,curName);

		// curBlock.selected = true;

		// app.doScript("graphic_style_from_selection","graphic_style_from_selection");
		// uvFile.graphicStyles[uvFile.graphicStyles.length-1].name = curName;
		// app.redraw();
		// debugger;
		changeColor(curName,curBlock);
	}

	// removeAction("graphic_style_from_selection");


	return result;


	function changeColor(name,src)
	{
		uvFile.selection = null;
		uvFile.defaultFillColor = makeNewSpotColor(name,"CMYK",BOOMBAH_APPROVED_COLOR_VALUES[name]).color;
		app.executeMenuCommand("Find Fill Color menu item");

		function dig(curItem)
		{
			if(curItem.typename === "PathItem")
			{
				gs.applyTo(curItem);
			}
			else if(curItem.typename === "CompoundPathItem")
			{
				if(curItem.pathItems.length)
				{
					gs.applyTo(curItem.pathItems[0]);
				}
				
				for(var g=0;curItem.groupItems && g<curItem.groupItems.length;g++)
				{
					dig(curItem.groupItems[g])
				}
			}
			else if(curItem.typename === "GroupItem")
			{
				for(var g=0,len=curItem.pageItems.length;g<len;g++)
				{
					dig(curItem.pageItems[g]);
				}
			}
		}

		var gs = findSpecificGraphicStyle(uvFile,name);
		if(gs)
		{
			var curSel,item;
			for(var cc=0,len=uvFile.selection.length;cc<len;cc++)
			{
				dig(uvFile.selection[cc]);
				item = undefined;
			}
		}
		else
		{
			uvFile.defaultFillColor = src.fillColor;
		}

		// try
		// {
		// 	var gs = uvFile.graphicStyles[name];
			
		// }
		// catch(e)
		// {
		// 	uvFile.defaultFillColor = src.fillColor;
		// }
	}

	
}