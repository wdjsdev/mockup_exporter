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

function exportUV ()
{

	getExportSettings();

	// kill all live text
	killAllLiveText();

	exportFile = File( networkExportPath + exportFileName );

	log.l( "Exporting UV to: " + exportFile.fullName );

	if ( exportType == "pdf" )
	{
		app.activeDocument.saveAs( exportFile, pdfSaveOpts );
	}
	else 
	{
		uvFile.exportFile( exportFile, exportType, exportOptions );
	}

	if ( exportType.toString().toLowerCase().indexOf( "svg" ) > -1 )
	{
		fixSvgCoding( exportFile );
	}


	if ( devMode )
	{
		exportFile = File( localExportPath + exportFileName );
		log.l( "Exporting UV to: " + exportFile.fullName );

		uvFile.exportFile( exportFile, exportType, exportOptions );

		if ( exportType.toString().toLowerCase().indexOf( "svg" ) > -1 )
		{
			fixSvgCoding( exportFile );
		}
	}


}