/*
	Component Name: duplicate_artwork
	Author: William Dowling
	Creation Date: 20 August, 2018
	Description: 
		for each artwork layer, duplicate all of the artwork
		into the parent group of it's destination piece
	Arguments
		curGroup
			group of garment pieces
	Return value
		success boolean

*/

function duplicateArtwork(curGroup)
{
	docRef.selection = null;
	artLayer.hasSelectedArtwork = true;
	for(var y=0,yLen = docRef.selection.length;y<yLen;y++)
	{
		checkArtForOverlap(docRef.selection[y],curGroup);
	}

	docRef.selection = null;
	return true;

	function checkArtForOverlap(art,pieces)
	{
		for(var x=0,len = pieces.pageItems.length;x<len;x++)
		{
			if(intersects(art,pieces.pageItems[x]))
			{
				art.duplicate(pieces.pageItems[x]);
			}
		}
	}
}