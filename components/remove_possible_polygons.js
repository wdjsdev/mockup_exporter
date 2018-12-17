/*
	Component Name: remove_possible_polygons
	Author: William Dowling
	Creation Date: 18 October, 2018
	Description: 
		located all paths in the artwork layer,
		ungroup them fully, then convert each
		one individually to a compound path to
		help avoid "polygon" elements being written
		in the exported SVG file.
	Arguments
		none
	Return value
		success boolean

*/

function removePossiblePolygons()
{
	var doc = app.activeDocument;
	var layers = doc.layers;

	var artLay = findSpecificLayer(layers,"Art");

	for(var x=0,len=artLay.pageItems.length;x<len;x++)
	{
		dig(artLay.pageItems[x]);
	}

	return true;


	function dig(item)
	{
		if(item.typename === "PathItem")
		{
			makeCompound(item)
		}
		else if(item.typename === "GroupItem")
		{
			for(var d=0,len = item.pageItems.length;d<len;d++)
			{
				dig(item.pageItems[d]);
			}
		}
	}

	function makeCompound(item)
	{
		doc.selection = null;
		item.selected = true;
		app.executeMenuCommand("compoundPath");
		doc.selection = null;
	}

}