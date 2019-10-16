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
	for (var x = 0, len = garmentsNeeded.length; x < len ; x++)
	{
		log.l("Beginning master loop number: " + (x+1) + " for garment: " + garmentsNeeded[x].name);

		if(devMode)
		{
			addParamColors();
			normalizeLayerName();
		}
		
		curGarmentLayer = garmentsNeeded[x];		
		curGarmentCode = getCode(curGarmentLayer.name);

		var paramLayerExists = false;
		for(var x=0,len=mockupLay.layers.length;x<len && !paramLayerExists;x++)
		{
			if(mockupLay.layers[x].name === "paramcolors" && mockupLay.layers[x].pageItems.length)
			{
				paramLayerExists = true;
			}
		}
		if(!paramLayerExists)
		{
			addParamColors();
			getParamColorValues();
		}
		
		if(!devMode)
		{
			curOrderNumber = getOrderNumber(docRef);
			if(!curOrderNumber)
			{
				//file is unsaved
				break;
			}
		}

		if(devMode)
		{
			exportPath = devExportPath + "/" + curGarmentCode + "_SVGs";
		}

		getMockupSize();
		
		if (!openUV(curGarmentCode))
		{
			continue;
		}
		log.l("UV File successfully opened.");
		if (!getMasterLayers())
		{
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

		if(!recolorDisplayBlocks(curGarmentCode))
		{
			log.e("Failed while recoloring the display blocks.");
			errorList.push("Failed while recoloring the display blocks.");
			continue;
		}
		
		if(devMode)
		{
			if(!removePossiblePolygons())
			{
				log.e("Failed while attempting to fix compound paths..");
				errorList.push("Failed while attempting to fix compound paths..");
				continue;
			}
		}

		app.doScript("cleanup_swatches","cleanup_swatches");

		if(devMode)
		{
			updateParamColorNames();
		}
		else
		{
			cleanupUVFile();
		}



		exportUV();

		filesToClose.push(uvFile);

	}

	return true;
}