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
		art.name = art.layer.name + "_art";
		var dest,artCopy;
		for(var x=0,len = pieces.pageItems.length;x<len;x++)
		{
			dest = pieces.pageItems[x];
			if(intersects(art,dest))
			{
				artCopy = art.duplicate(dest);
				if(!isContainedWithin(artCopy,dest))
				{
					makeMask(artCopy,dest);
				}
			}
			dest = undefined;
		}
	}

	function makeMask(art,maskShape)
	{
		var suffix = "_clip_mask";
		var clipGroup;
		
		try
		{
			clipGroup = maskShape.groupItems[maskShape.name + suffix];
		}
		catch(e)
		{
			clipGroup = maskShape.groupItems.add();
			clipGroup.name = maskShape.name + suffix;
		}

		art.moveToBeginning(clipGroup);

		var mask = clipGroup.pathItems.rectangle(maskShape.top,maskShape.left,maskShape.width,maskShape.height);
		mask.filled = false;
		mask.stroked = false;
		clipGroup.clipping = true;
		mask.clipped = true;

		return clipGroup;

	}
}