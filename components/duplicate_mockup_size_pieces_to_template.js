	/*
	Component Name: duplicate_mockup_size_pieces_to_template
	Author: William Dowling
	Creation Date: 07 August, 2018
	Description: 
		for the given mockup size, grab all of the pieces
		from the prepress layer, duplicate them to the
		appropriate 3d mockup template file, scale them
		up to the correct sizing, and match their placement
		to the provided guides
	Arguments
		none
	Return value
		void

*/

function duplicateMockupSizePiecesToTemplate()
{
	docRef.activate();
	tmpLay = docRef.layers.add();

	//move the paramColors
	paramGroup = tmpLay.groupItems.add();
	app.redraw();

	releaseCompoundPaths(paramLayer.pageItems);
	
	var curParamBlock,counter=1;
	for(var x=paramLayer.pageItems.length-1;x>=0;x--)
	// for(var x=0,len=paramLayer.pageItems.length;x<len;x++)
	{
		curParamBlock = paramLayer.pageItems[x];
		if(!/-C\d/.test(curParamBlock.name))
		{
			curParamBlock.name = "paramcolor-C" + counter;
		}
		curParamBlock.duplicate(paramGroup);
		counter++;
	}

	var curLay,curGroup,curSize,curItem;
	for(var x=0,len=ppLay.layers.length;x<len;x++)
	{
		curLay = ppLay.layers[x];
		if(curLay.name === mockupSize)
		{
			curGroup = tmpLay.groupItems.add();
			curGroup.name = "curGroup";
			curSize = curLay.pageItems[0].name.substring(0,curLay.pageItems[0].name.indexOf(" "));
			for(var y=0,yLen = curLay.pageItems.length;y<yLen;y++)
			{
				curItem = curLay.pageItems[y];
				if(sizeType === "std" || curItem.name.indexOf(mockupSize) === 0)
				{
					curItem.duplicate(curGroup);
				}
				else if(sizeType === "var")
				{
					if(curItem.name.indexOf(waistSize) === 0)
					{
						curItem.duplicate(curGroup);
					}
				}
			}
			break;	
		}
	}
	if(curGroup)
	{
		duplicateArtwork(curGroup);

		tmpArtGroup = curGroup.duplicate(uvFile);
		tmpArtGroup.moveToBeginning(uvArtLayer);

		tmpParamGroup = paramGroup.duplicate(uvFile);
		tmpParamGroup.moveToBeginning(uvParamLayer);
		
		uvFile.activate();
		ungroupTmpGroup();
		tmpLay.remove();
		recolorArtwork();
		removeProductionInfo();		
		app.executeMenuCommand("clearguide");
		return true;
	}
	else
	{
		errorList.push("Failed to find any artwork on the prepress layer for the size: " + mockupSize);
		return false;
	}
}