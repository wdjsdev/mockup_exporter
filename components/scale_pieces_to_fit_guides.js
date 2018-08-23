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
	var curName,curItem,curGuide;
	var itemDim,guideDim,scaleFactor;
	var itemCenter,guideCenter;
	for(var x=0,len = uvArtLayer.pageItems.length;x<len;x++)
	{
		curItem = uvArtLayer.pageItems[x];
		curName = curItem.name;
		try
		{
			curGuide = uvGuidesLayer.pageItems[curName];
		}
		catch(e)
		{
			errorList.push("The UV Map File has no target for " + curName);
			valid = false;
			continue;
		}

		guideDim = curGuide.width > curGuide.height ? curGuide.width : curGuide.height;
		itemDim = curItem.width > curItem.height ? curItem.width : curItem.height;
		scaleFactor = (guideDim / itemDim) * 100;
		curItem.resize(scaleFactor,scaleFactor);

		guideCenter = getCenterPoint(curGuide);
		setCenterPoint(curItem,guideCenter);

	}

	for(var x=0,len=uvParamLayer.pageItems.length;x<len;x++)
	{
		curItem = uvParamLayer.pageItems[x];
		curItem.left = uvArtboards[0].artboardRect[0];
		curItem.top = uvArtboards[0].artboardRect[1] + (x * -5);
	}
	return true;
}