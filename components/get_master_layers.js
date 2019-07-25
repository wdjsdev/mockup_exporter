/*
	Component Name: get_master_layers
	Author: William Dowling
	Creation Date: 17 August, 2018
	Description: 
		find the necessary layers in the given
		garment layer
	Arguments
		none
	Return value
		success boolean

*/

function getMasterLayers()
{
	ppLay = getPPLay(curGarmentLayer);
	if(!ppLay)
	{
		errorList.push("Failed to find the prepress layer for " + curGarmentLayer.name);
		return false;
	}

	mockupLayer = findSpecificLayer(curGarmentLayer,"Mockup");
	if(!mockupLayer)
	{
		errorList.push("Failed to find a mockup layer for " + curGarmentLayer.name);
		return false;
	}

	paramLayer = findSpecificLayer(mockupLayer,"paramcolors");
	if(!paramLayer)
	{
		errorList.push("Failed to find the paramcolors layer for " + curGarmentLayer.name);
		return false;
	}

	artLayer = findSpecificLayer(curGarmentLayer,"Artwork Layer");
	if(!artLayer)
	{
		errorList.push("Failed to find the artwork layer for " + curGarmentLayer.name);
		return false;
	}

	infoLayer = findSpecificLayer(curGarmentLayer,"Information");
	if(infoLayer)
	{
		if(devMode)
		{
			exportFileName = layers[0].name;
		}
		else
		{
			infoLayer.locked = false;
			var designIdFrame = findChildByName(infoLayer,"designId","TextFrame");
			if(designIdFrame)
			{
				curGarmentDesignId = designIdFrame.contents;
			}
			else
			{
				if(!devMode)
				{
					curGarmentDesignId = getCurGarmentDesignId();
				}

				var position = [19,-69];
				try
				{
					var orderNumberFrame = infoLayer.textFrames["Order Number"];
					position = [orderNumberFrame.left,orderNumberFrame.top - 12];
				}
				catch(e){};
				var idFrame = infoLayer.textFrames.add();
				idFrame.name = "Design ID";
				idFrame.contents = curGarmentDesignId;
				idFrame.position = position;
			}
			exportFileName = curGarmentDesignId + "-" + curOrderNumber + "-mockup";

			infoLayer.locked = true;
		}
	}
	else
	{
		errorList.push("Failed to find the Information layer for " + curGarmentLayer.name);
		return false;	
	}
	
	return true;
}