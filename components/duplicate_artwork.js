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

	var artItems = [];

	//masksToMake is formatted like so:
	/*
		{
			"XL Front Left":
			{
				destPiece:(the art object matching the label for this object),
				art:[(art object),(art object)] // array of art objects
			}
		}
	*/
	//for each "dest" in the masksToMake object
	//loop the array of art items and add each one
	//to the clipping mask
	var masksToMake = {};

	// for(var y=artLayer.pageItems.length-1;y>=0;y--)
	for(var y=0;y<artLayer.pageItems.length;y++)
	{
		artItems.push(artLayer.pageItems[y]);
	}
	app.selection = null;


	for(var x=0,len=artItems.length;x<len;x++)
	// for(var x = artItems.length -1; x>=0;x--)
	{
		checkArtForOverlap(artItems[x],curGroup);
	}

	var curDest;
	for(var dest in masksToMake)
	{
		curDest= masksToMake[dest];
		for(var x=0,len=curDest.art.length;x<len;x++)
		{
			makeMask(curDest.art[x],curDest.destPiece,curDest.destPiece.artGroup);
		}
	}

	
	return true;

	function checkArtForOverlap(art,curGroup)
	{
		var dest,artCopy,artName,artGroup;
		// for(var x=0,len = curGroup.pageItems.length;x<len;x++)
		for(var x=curGroup.pageItems.length-1;x>=0;x--)
		{

			dest = curGroup.pageItems[x];
			artGroup = findSpecificPageItem(dest,"art_group","match");
			if(!artGroup)
			{
				artGroup = dest.artGroup = dest.groupItems.add();
				artGroup.name = "art_group";
			}

			if(intersects(art,dest))
			{
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
					art.duplicate(artGroup);
				}
			}

			dest = undefined;
			docRef.selection = null;
		}
	}

	function makeMask(art,maskShape,artGroup)
	{
		var suffix = "_clip_mask";
		var clipGroup,mask;
		var parent = maskShape.parent;
		var artCopy;
		
		clipGroup = findSpecificPageItem(artGroup,maskShape.name + suffix,"any");

		if(!clipGroup)
		{
			clipGroup = artGroup.groupItems.add();
			clipGroup.name = maskShape.name + suffix;
		}

		

		//identify or create the clipping path
		mask = findSpecificPageItem(clipGroup,"clip_path","any");
		if(!mask)
		{
			mask = clipGroup.pathItems.rectangle(maskShape.top,maskShape.left,maskShape.width,maskShape.height);
			// mask.move(clipGroup, ElementPlacement.PLACEATBEGINNING);
		}

		mask.name = "clip_path";
		mask.filled = false;
		mask.stroked = false;
		mask.clipping = true;

		//copy art to clip group
		artCopy = art.duplicate(clipGroup,ElementPlacement.PLACEATEND);

		// artCopy.zOrder(ZOrderMethod.SENDTOBACK);
		clipGroup.clipped = true;
		clipGroup.zOrder(ZOrderMethod.SENDTOBACK);

		
		


		// try
		// {
		// 	clipGroup = maskShape.groupItems[maskShape.name + suffix];
		// 	mask = clipGroup.pageItems["clip_path"];
		// 	artCopy = art.duplicate(clipGroup);
		// 	artCopy.zOrder(ZOrderMethod.SENDTOBACK);

		// }
		// catch(e)
		// {
		// 	clipGroup = maskShape.groupItems.add();
		// 	clipGroup.name = maskShape.name + suffix;
		// 	mask = parent.pathItems.rectangle(maskShape.top,maskShape.left,maskShape.width,maskShape.height);
		// 	mask.name = "clip_path";
		// 	mask.filled = false;
		// 	mask.stroked = false;
		// 	artCopy = art.duplicate(clipGroup);
		// 	mask.move(clipGroup, ElementPlacement.PLACEATBEGINNING);
		// 	artCopy.zOrder(ZOrderMethod.SENDTOBACK);
		// }


	}
}