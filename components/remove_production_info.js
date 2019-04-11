/*
	Component Name: remove_production_info
	Author: William Dowling
	Creation Date: 13 August, 2018
	Description: 
		remove all production color info from the
		document to facilitate accurate sizing
		and placement, as well as preventing any
		extraneous colors from appearing on 3d mockup
	Arguments
		none
	Return value
		success boolean

*/

function removeProductionInfo()
{
	var colorsToRemove = BOOMBAH_PRODUCTION_COLORS;

	//add the collar colors to the list of colors to remove
	colorsToRemove = colorsToRemove.concat(COLLAR_COLORS);
	var toBeRemoved = [];

	for(var x=0,len=colorsToRemove.length;x<len;x++)
	{
		findProdColor(colorsToRemove[x]);
	}

	for(var x= toBeRemoved.length-1;x>=0;x--)
	{
		try
		{
			toBeRemoved[x].remove();
		}
		catch(e){}
	}

	return true;

	function findProdColor(swatchName)
	{
		var curSwatch;
		uvFile.selection = null;
		app.redraw();
		var tmpColorValues = {
			cyan: 0,
			magenta: 0,
			yellow: 0,
			black: 0
		}
		curSwatch = makeNewSpotColor(swatchName, "CMYK", tmpColorValues);

		var tmpBlock = uvFile.pathItems.rectangle(0, 0, 5, 5);
		tmpBlock.fillColor = curSwatch.color;
		tmpBlock.stroked = false;
		tmpBlock.selected = true;
		app.executeMenuCommand("Find Fill Color menu item");
		tmpBlock.remove();
		pushRmColors(uvFile.selection);
		uvFile.selection = null;

		tmpBlock = uvFile.pathItems.rectangle(0, 0, 5, 5);
		tmpBlock.strokeColor = curSwatch.color;
		tmpBlock.filled = false;
		tmpBlock.selected = true;
		app.executeMenuCommand("Find Stroke Color menu item");
		tmpBlock.remove();
		pushRmColors(uvFile.selection);
		uvFile.selection = null;

		function pushRmColors(arr)
		{
			for(var x=0,len=arr.length;x<len;x++)
			{
				toBeRemoved.push(arr[x]);
			}
		}
	}
}