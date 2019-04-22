/*
	Component Name: independent_export_uv
	Author: William Dowling
	Creation Date: 27 March, 2019
	Description: 
		output the image file.
		export a jpg according to global jpg
		settings found in variables file
	Arguments
		none
	Return value
		success boolean

*/

function independentExportUV()
{
	#include "../components/fix_svg_coding.js";
	var uvFile = app.activeDocument;
	var svgExportType = ExportType.SVG;
	var svgExportOptions = new ExportOptionsSVG();
		svgExportOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
	var svgExt = ".svg";

	var exportType = svgExportType;
	var exportOptions = svgExportOptions;
	var exportFile = File(docRef.fullName);

	uvFile.exportFile(File(uvFile.fullName),exportType,exportOptions);

	fixSvgCoding(uvFile);
}
independentExportUV();