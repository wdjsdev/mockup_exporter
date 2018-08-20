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
	tmpLay = docRef.layers.add();

	//move the paramColors
	paramGroup = tmpLay.groupItems.add();
	for(var x=0,len=paramLayer.pageItems.length;x<len;x++)
	{
		paramLayer.pageItems[x].duplicate(paramGroup);
	}

	var curLay,curGroup;
	for(var x=0,len=ppLay.layers.length;x<len;x++)
	{
		curLay = ppLay.layers[x];
		if(curLay.name === mockupSize)
		{
			curGroup = tmpLay.groupItems.add();
			curGroup.name = "curGroup";
			for(var y=0,yLen = curLay.pageItems.length;y<yLen;y++)
			{
				curLay.pageItems[y].duplicate(curGroup);
			}
			break;	
		}
	}
	if(curGroup)
	{

		tmpArtGroup = curGroup.duplicate(uvFile);
		tmpArtGroup.moveToBeginning(uvArtLayer);
		tmpParamGroup = paramGroup.duplicate(uvFile);
		tmpParamGroup.moveToBeginning(uvParamLayer);
		uvFile.activate();
		ungroupTmpGroup();
		curGroup.remove();
		paramGroup.remove();
		tmpLay.remove();
		removeProductionInfo();
		updateArtColors();
		return true;
	}
	else
	{
		errorList.push("Failed to find any artwork on the prepress layer for the size: " + mockupSize);
		return false;
	}
}