/*
	Component Name: master_loop
	Author: William Dowling
	Creation Date: 16 August, 2018
	Description: 
		perform the mockup export process for
		each layer in the garmentsNeeded array
	Arguments
		none
	Return value
		success boolean

*/

function masterLoop()
{
	//garmentsNeeded is an array of template layers
	for(var x=0,len=garmentsNeeded.length;x<len;x++)
	{
		curGarmentLayer = garmentsNeeded[x];
		curGarmentCode = getCode(curGarmentLayer.name);
		mockupSize = getMockupSize();
		if(!getMasterLayers())
		{
			continue;
		}
		if(!openUV(curGarmentCode))
		{
			continue;
		}

		if(!duplicateMockupSizePiecesToTemplate(uvFile))
		{
			continue;
		}
		
		uvFile.activate();

		if(!scalePiecesToFitGuides())
		{
			continue;
		}
	}
}