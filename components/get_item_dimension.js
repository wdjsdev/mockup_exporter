function getItemDimension(item)
{
	log.l("getting item dimension for: " + item.name);
	var itemDim;
	var clipGroup = findSpecificPageItem(item,"clip_mask");
	var pieceGroup; //group of all items except the clip group
	log.l(item.name + ".clipGroup = " + clipGroup);
	if(clipGroup)
	{
		item.hasClipGroup = true;
		pieceGroup = item.groupItems.add();
		pieceGroup.name = "piece_group";
		app.selection = null;
		//group everything except the clip group
		var curItem;
		for(var x = item.pageItems.length-1;x>=0;x--)
		{
			curItem = item.pageItems[x];
			if(curItem.name === clipGroup.name || curItem.name == pieceGroup.name)
			{
				continue;
			}
			item.pageItems[x].move(pieceGroup, ElementPlacement.PLACEATEND);
		}
		pieceGroup.zOrder(ZOrderMethod.SENDTOBACK);
		
		itemDim = pieceGroup.width > pieceGroup.height ? pieceGroup.width : pieceGroup.height;

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