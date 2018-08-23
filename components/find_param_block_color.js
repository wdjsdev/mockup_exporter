/*
	Component Name: find_param_block_color
	Author: William Dowling
	Creation Date: 23 August, 2018
	Description: 
		search for the paramcolor blocks in the current
		document and find a block that matches
		the search term given
	Arguments
		name
			string representing the c# value of the
			desired swatch
	Return value
		the fillColor name of the block

*/

function findParamBlockColor(name)
{
	var paramBlocks = uvParamLayer.pageItems;
	for(var x=0,len=paramBlocks.length;x<len;x++)
	{
		// if(/-C[\d]{1,2}$/.test(paramBlocks[x].name))
		// {
		// 	return paramBlocks[x].fillColor.spot.name;
		// }

		if(paramBlocks[x].name === "paramcolor-" + name)
		{
			return paramBlocks[x].fillColor.spot.name;
		}
	}
	return undefined;
}