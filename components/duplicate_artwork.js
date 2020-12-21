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
	app.selection = null;
	artLayer.hasSelectedArtwork = true;
	var artItems = [];

	//masksToMake is formatted like so:
	/*
		{
			"XL Front Left":
			{
				destPiece:(the art object matching the label for this object),
				[(art object),(art object)]
			}
		}
	*/
	//for each "dest" in the masksToMake object
	//loop the array of art items and add each one
	//to the clipping mask
	var masksToMake = {};

	for(var y=docRef.selection.length-1;y>=0;y--)
	{
		artItems.push(docRef.selection[y]);
	}
	app.selection = null;


	for(var x=0,len=artItems.length;x<len;x++)
	{
		checkArtForOverlap(artItems[x],curGroup);
	}

	var curDest;
	for(var dest in masksToMake)
	{
		curDest= masksToMake[dest];
		for(var x=0,len=curDest.art.length;x<len;x++)
		{
			makeMask(curDest.art[x],curDest.destPiece);
		}
	}

	
	return true;

	function checkArtForOverlap(art,curGroup)
	{
		var dest,artCopy,artName;
		artName = art.layer.name + "_art";
		for(var x=0,len = curGroup.pageItems.length;x<len;x++)
		{
			dest = curGroup.pageItems[x];
			if(intersects(art,dest))
			{
				// artCopy = art.duplicate();
				// artCopy.name = artName;
				if(!isContainedWithin(art,dest))
				{
					if(!masksToMake[dest.name])
					{
						masksToMake[dest.name] = {};
						masksToMake[dest.name].destPiece = dest;
						masksToMake[dest.name].art = [];
					}
					masksToMake[dest.name].art.push(art);
					// makeMask(artCopy,dest);
				}
				else
				{
					art.duplicate(dest);
				}
			}
			dest = undefined;
			docRef.selection = null;
		}
	}

	function makeMask(art,maskShape)
	{
		var suffix = "_clip_mask";
		var clipGroup,mask;
		var parent = maskShape.parent;
		var artCopy;
		
		try
		{
			clipGroup = maskShape.groupItems[maskShape.name + suffix];
			mask = clipGroup.pageItems["clip_path"];
			artCopy = art.duplicate(clipGroup);
			artCopy.zOrder(ZOrderMethod.SENDTOBACK);

		}
		catch(e)
		{
			clipGroup = maskShape.groupItems.add();
			clipGroup.name = maskShape.name + suffix;
			mask = parent.pathItems.rectangle(maskShape.top,maskShape.left,maskShape.width,maskShape.height);
			mask.name = "clip_path";
			mask.filled = false;
			mask.stroked = false;
			artCopy = art.duplicate(clipGroup);
			mask.move(clipGroup, ElementPlacement.PLACEATBEGINNING);
			artCopy.zOrder(ZOrderMethod.SENDTOBACK);
		}

		mask.clipping = true;
		clipGroup.clipped = true;

		

		

		

	}
}