function getItemDimension(item)
{
	
	log.l("getting item dimension for: " + item.name);
	var itemDim;
	var pieceGroup; //group of all items except the clip group
	var clipGroup;


	var artGroup = findSpecificPageItem(item,"art_group","any");
	if(artGroup)
	{
		clipGroup = findSpecificPageItem(artGroup,"clip_mask","any");
	}


	if(clipGroup)
	{
		item.clipMask = clipGroup.pageItems[0];
		item.hasClipGroup = true;
		var mask = clipGroup.pathItems[0];
		itemDim = mask.width > mask.height ? mask.width : mask.height;
	}
	else
	{
		itemDim = item.width > item.height ? item.width : item.height;
	}

	log.l("item.width = " + item.width);
	log.l("itemDim = " + itemDim);
	return itemDim;
}
// getItemDimension(app.activeDocument.pageItems[0]);