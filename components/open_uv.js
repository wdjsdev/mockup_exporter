/*
	Component Name: open_uv
	Author: William Dowling
	Creation Date: 07 August, 2018
	Description: 
		open the necessary uv template file
		for the current garment
	Arguments
		garmentCode
			string representing FD code for the necessary garment.
	Return value
		success boolean

*/

function openUV(garmentCode)
{
	log.l("Opening UV for " + garmentCode);
	var result;
	var files = uvFolder.getFiles();

	for (var x = 0, len = files.length; x < len && !result; x++)
	{
		if (files[x].name === garmentCode + ".ait")
		{
			result = files[x];
			log.l("UV file was identified as " + result.name);
		}
	}

	if (result)
	{
		uvFile = app.open(result);
		uvLayers = uvFile.layers;
		uvSwatches = uvFile.swatches;
		uvArtboards = uvFile.artboards;
		uvParamLayer = findSpecificLayer(uvFile,"paramcolors");
		uvArtLayer = findSpecificLayer(uvFile,"Art");
		uvGuidesLayer = findSpecificLayer(uvFile,"Guides");

		log.l("uvParamLayer = " + uvParamLayer);
		log.l("uvArtLayer = " + uvArtLayer);
		log.l("uvGuidesLayer = " + uvGuidesLayer);


		if(!uvArtLayer)
		{
			log.l("Failed to find the uvArtLayer. Creating one now.");
			uvArtLayer = uvLayers.add();
			uvArtLayer.name = "Art";
		}

		if(!uvParamLayer)
		{
			log.l("Failed to find the uvParamLayer. Creating one now.");
			uvParamLayer = uvLayers.add();
			uvParamLayer.name = "paramcolors";
		}

		
		if(!uvGuidesLayer)
		{
			log.e("Failed to find the uvGuidesLayer. Cannot proceed. returning false.");
			errorList.push("The UV Map file is missing the necessary \"Guides\" layer.");
			return false;
		}

		docRef.activate();
		return true;
	}
	else
	{
		log.e("Failed to find a UV Map File for the garment code: " + garmentCode);
		errorList.push(garmentCode + " is not ready for the 3D builder. Sorry.");
		return false;
	}
}