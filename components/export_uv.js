/*
	Component Name: export_uv
	Author: William Dowling
	Creation Date: 23 August, 2018
	Description: 
		output the image file.
		export a jpg according to global jpg
		settings found in variables file
	Arguments
		none
	Return value
		success boolean

*/

function exportUV()
{
	exportFile = File(exportPath + "/" + exportFileName + exportExtension);

	log.l("Exporting UV to: " + exportFile.fullName);

	addGraphicTargets();

	uvFile.exportFile(exportFile,exportType,exportOptions);

	fixSvgCoding(exportFile);
}