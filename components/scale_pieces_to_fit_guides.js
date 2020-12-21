/*
	Component Name: scale_pieces_to_fit_guides
	Author: William Dowling
	Creation Date: 08 August, 2018
	Description: 
		loop the items on the "Art" layer in the
		UV Map file and scale each to match the
		corresponding guide box, then center the
		piece to the guide
		look for discrepancies and alert the user
		if anything doesn't match
	Arguments
		none
	Return value
		success boolean

*/

function scalePiecesToFitGuides()
{
	//bleed value
	//integer in points representing how many points
	//by which to increase the size of each garment piece
	//to ensure full coverage of the UV Map
	// var GARMENT_PIECE_BLEED = 2;

	var curName,curItem,curGuide;
	var itemDim,guideDim,scaleFactor;
	var itemCenter,guideCenter;
	var leftOverlap,topOverlap;
	var clipGroup,pieceGroup;

	//boolean to determine whether any appropriate guide boxes were found
	var guidesFound = false;

	// for(var x=0,len = uvArtLayer.pageItems.length;x<len;x++)
	for(var x = uvArtLayer.pageItems.length-1;x>=0;x--)
	{
		curItem = uvArtLayer.pageItems[x];
		curName = curItem.name;
		try
		{
			curGuide = uvGuidesLayer.pageItems[curName];
			guidesFound = true;
		}
		catch(e)
		{
			// errorList.push("The UV Map File has no target for " + curName);
			// valid = false;
			continue;
		}

		//figure out the dimensions of curItem minus any clipped artwork
		//basically we want the width or height of the visible group,
		// itemDim = curItem.width > curItem.height ? curItem.width : curItem.height;
		itemDim = getItemDimension(curItem);


		guideDim = curGuide.width > curGuide.height ? curGuide.width : curGuide.height;
		

		scaleFactor = (guideDim / itemDim) * 100;
		curItem.resize(scaleFactor,scaleFactor,true,true,true,true,scaleFactor);

		if(!curItem.hasClipGroup)
		{
			log.l(curItem.name + " has no clipping masks. using center point positioning")
			guideCenter = getCenterPoint(curGuide);
			setCenterPoint(curItem,guideCenter);	
		}
		else
		{
			log.l(curItem.name + " has clipping masks. Using standard positioning.")
			clipGroup = curItem.pageItems[0];
			pieceGroup = curItem.pageItems[1];

			curItem.left = curGuide.left;
			curItem.top= curGuide.top;

			leftOverlap = pieceGroup.left - clipGroup.left;
			topOverlap = clipGroup.top - pieceGroup.top;
			if(clipGroup.left < pieceGroup.left)
			{
				log.l("moving " +  curItem.name + ": " + leftOverlap + " points left.");
				curItem.left -= leftOverlap;
			}
			if(clipGroup.top > pieceGroup.top)
			{
				log.l("moving " +  curItem.name + ": " + topOverlap + " points up.");
				curItem.top += topOverlap;
			}
			
		}
		
		

	}

	if(!guidesFound)
	{
		errorList.push("Failed to find any guide boxes in the UV Map File.");
		valid = false;
		return false;
	}

	for(var x=0,len=uvParamLayer.pageItems.length;x<len;x++)
	{
		curItem = uvParamLayer.pageItems[x];
		curItem.left = uvArtboards[0].artboardRect[0];
		curItem.top = uvArtboards[0].artboardRect[1] + (x * -5);
	}
	return true;
}