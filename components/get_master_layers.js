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
	ppLay = getPPLay(docRef.layers);
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
	
	return true;
}