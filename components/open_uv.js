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
	var result;
	var files = uvFolder.getFiles();

	for (var x = 0, len = files.length; x < len && !result; x++)
	{
		if (files[x].name === garmentCode + ".ait")
		{
			result = files[x];
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
		if(!uvArtLayer)
		{
			uvArtLayer = uvLayers.add();
			uvArtLayer.name = "Art";
		}
		uvGuidesLayer = findSpecificLayer(uvFile,"Guides");
		if(!uvGuidesLayer)
		{
			errorList.push("The UV Map file is missing the necessary \"Guides\" layer.");
			return false;
		}
		docRef.activate();
		return true;
	}
	else
	{
		errorList.push("Failed to find a UV Map File for the garment code: " + garmentCode);
		return false;
	}
}