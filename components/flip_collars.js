function flipCollars()
{
	for(var x=0,len=uvArtLayer.pageItems.length;x<len;x++)
	{
		if(uvArtLayer.pageItems[x].name.indexOf("ollar") > -1)
		{
			uvArtLayer.pageItems[x].rotate(180);
		}
	}
}