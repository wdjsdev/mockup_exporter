/*
	Component Name: get_export_settings
	Author: William Dowling
	Creation Date: 19 November, 2020
	Description: 
		determine the export folder location, export file name
		and export format (svg or jpg).
	Arguments
		none
	Return value
		void

*/

function getExportSettings ()
{
	if ( !Folder( networkExportPath ).exists )
	{
		Folder( networkExportPath ).create();
	}

	exportType = svgExportType;
	exportOptions = svgExportOptions;
	exportExtension = svgExt;
	// if(blankMode)
	// {
	// 	exportType = svgExportType;
	// 	exportOptions = svgExportOptions;
	// 	exportExtension = svgExt;
	// }
	// else
	// {
	// 	exportType = jpgExportType;
	// 	exportOptions = jpgExportOptions;
	// 	exportExtension = jpgExt;
	// }

	exportFileName = layers[ 0 ].name + "_" + exportFileName + "_" + exportExtension;
}