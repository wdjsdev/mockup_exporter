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
	for (var x = 0, len = garmentsNeeded.length; x < len; x++)
	{
		log.l("Beginning master loop number: " + (x+1) + " for garment: " + garmentsNeeded[x].name);

		if(devMode)addParamColors();
		
		curGarmentLayer = garmentsNeeded[x];
		curGarmentCode = getCode(curGarmentLayer.name);
		mockupSize = getMockupSize();
		if (!openUV(curGarmentCode))
		{
			continue;
		}
		if (!getMasterLayers())
		{
			log.l("UV File successfully opened.");
			continue;
		}

		if (!duplicateMockupSizePiecesToTemplate(uvFile))
		{
			log.l("Successfully found the necessary layers in the Master File.");
			continue;
		}

		uvFile.activate();

		if (!scalePiecesToFitGuides())
		{
			continue;
		}

		log.l("Successfully scaled and  positioned the pieces on the UV Map.");

		var specialSuccess = true;
		if (mockupExporterSpecialInstructions[curGarmentCode] && mockupExporterSpecialInstructions.populateDocProps())
		{

			log.l("Special instructions are necessary for " + curGarmentCode);
			specialSuccess = mockupExporterSpecialInstructions[curGarmentCode]();

		}

		if (!specialSuccess)
		{
			log.e("Failed to execute the special instructions for " + curGarmentCode);
			errorList.push("Special instructions function failed for: " + curGarmentCode);
			continue;
		}

		log.l("Successfully executed special instructions.");

		if(!removePossiblePolygons())
		{
			log.e("Failed while attempting to fix compound paths..");
			errorList.push("Failed while attempting to fix compound paths..");
			continue;
		}

		app.doScript("rmswatches","rmswatches");

		exportUV();

	}

	return true;
}