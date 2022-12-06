
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

function scalePiecesToFitGuides ()
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
	var clipGroup,pieceGroup,artGroup,clipMask;

	//boolean to determine whether any appropriate guide boxes were found
	var guidesFound = false;


	for(var x = uvArtLayer.pageItems.length-1;x>=0;x--)
	{
		curItem = uvArtLayer.pageItems[ x ];
		curName = curItem.name;
		curGuide = findSpecificPageItem(uvGuidesLayer,curName,"imatch");
		if(!curGuide)
		{
			log.e("Didn't find a guide matching the name: " + curName);
			continue;
		}
		guidesFound = true;

		//figure out the dimensions of curItem minus any clipped artwork
		//basically we want the width or height of the visible group,
		// itemDim = curItem.width > curItem.height ? curItem.width : curItem.height;

		itemVb = getBoundsData( curItem );
		// itemDim = getItemDimension(curItem);

		itemDim = itemVb.w > itemVb.h ? itemVb.w : itemVb.h;

		//biggest dimension of dest guide box
		guideDim = curGuide.width > curGuide.height ? curGuide.width : curGuide.height;

		//scale the whole item up to match guide box dimensions
		scaleFactor = (guideDim / itemDim) * 100;
		curItem.resize(scaleFactor,scaleFactor,true,true,true,true,scaleFactor);

		//get the centerpoint of guide box
		guideCenter = getCenterPoint(curGuide);

		if(!curItem.hasClipGroup || !curItem.clipMask)
		{
			log.l(curItem.name + " has no clipping masks. using center point positioning")
			
			setCenterPoint(curItem,guideCenter);	
		}
		else
		{
			log.l(curItem.name + " has clipping masks. Using standard positioning.")

			clipMask = curItem.clipMask;
			curItem.left = curGuide.left - (clipMask.left - curItem.left);
			curItem.top = curGuide.top + (curItem.top - clipMask.top);
		}
		
		

	}

	if ( !guidesFound )
	{
		errorList.push( "Failed to find any guide boxes in the UV Map File." );
		valid = false;
		return false;
	}

	//move the param blocks to the top left corner of the artboard
	for(var x=0,len=uvParamLayer.pageItems.length;x<len;x++)
	{
		curItem = uvParamLayer.pageItems[ x ];
		curItem.left = uvArtboards[ 0 ].artboardRect[ 0 ];
		curItem.top = uvArtboards[ 0 ].artboardRect[ 1 ] + ( x * -5 );
	}
	return true;
}