/*
	Component Name: ungroup_tmp_group
	Author: William Dowling
	Creation Date: 08 August, 2018
	Description: 
		locate the temporary group in the UV file
		and ungroup it and move the child elements
		to the "Art" layer.
		while we're at it, strip the size info from the name
	Arguments
		none
	Return value
		success boolean

*/

function ungroupTmpGroup()
{
	for(var x=tmpArtGroup.pageItems.length-1;x>=0;x--)
	{
		tmpArtGroup.pageItems[x].name = tmpArtGroup.pageItems[x].name.replace(/[.\S]*[\s]/,"");
		tmpArtGroup.pageItems[x].moveToBeginning(uvArtLayer);
	}

	for(var x = tmpParamGroup.pageItems.length-1;x>=0;x--)
	{
		tmpParamGroup.pageItems[x].moveToBeginning(uvParamLayer);
	}

	return true;
}