function updateParamColorNames()
{
	var paramBlocks = paramLayer.pageItems;

	for(var x=0,len=paramBlocks.length;x<len;x++)
	{
		paramBlocks[x].name = paramBlocks[x].name.replace("B","C");
	}
}