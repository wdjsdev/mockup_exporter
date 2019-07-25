function updateParamColorNames()
{
	var paramBlocks = uvParamLayer.pageItems;

	for(var x=0,len=paramBlocks.length;x<len;x++)
	{
		paramBlocks[x].name = paramBlocks[x].name.replace("B","C");
	}
}