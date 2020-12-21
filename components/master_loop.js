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

		if(curGarmentCode)
		{
			//add the garment code to the end of the export path
			//so that the files are saved into subfolders by garment code
			//all the FD-161 mockups will go into a FD-161 folder.
			networkExportPath += curGarmentCode + "/";
		}
		else
		{
			log.e("failed to determine the garment code. continuing loop");
			continue;
		}

		var paramLayerExists = false;
		for(var y=0,ylen=mockupLay.layers.length;y<ylen && !paramLayerExists;y++)
		{
			if(mockupLay.layers[y].name === "paramcolors" && mockupLay.layers[y].pageItems.length)
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
			printDesignNumberOnMockup();
			if(!curOrderNumber)
			{
				//file is unsaved
				break;
			}
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

		if(mockupExporterGarmentData[curGarmentCode] && mockupExporterGarmentData[curGarmentCode].flipCollars)
		{
			flipCollars();
		}

		if (!scalePiecesToFitGuides())
		{
			continue;
		}

		log.l("Successfully scaled and  positioned the pieces on the UV Map.");

		if(!recolorDisplayBlocks())
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

		if(blankMode)
		{
			filesToClose.push(uvFile);
		}
		

	}

	return true;
}