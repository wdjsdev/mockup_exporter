/*
	Component Name: mockup_exporter_global_variables
	Author: William Dowling
	Creation Date: 07 August, 2018
	Description: 
		set of global variables for the mockup exporter script
*/

	////////////

	//dev mode

	////////////
	
var devMode = true;

	////////////

	//dev mode

	////////////



	//master file variables
var docRef,
	layers,
	aB,
	swatches,
	artLay, //artwork layer for the given garment
	ppLay, //prepress layer for the given garment
	mockupLay, //mockup layer for the given garment
	infoLayer,//information layer for the given garment
	paramLayer, //sublayer inside mockup layer that contains paramcolor blocks
	sizeType = "std", //string representing the sizing structure. "std" = standard, "var" = variable inseam
	placeholderSwatchLetter = "C";

	//garment variables
var garmentsNeeded = [],
	curGarmentLayer,
	curGarmentDesignId,
	mockupSize,
	tmpLay,
	tmpArtGroup,
	tmpParamGroup;



	//uv file variables
var uvFolder = Folder("/Volumes/Customization/Library/Scripts/Script Resources/Files/uv_maps"),
	uvFile,
	uvLayers,
	uvArtboards,
	uvSwatches,
	uvArtLayer,
	uvParamLayer,
	uvGuidesLayer;



	//export variables
var appendages = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
	exportPath = "/Volumes/Customization/Library/Scripts/Script Resources/Files/3d_mockup_exports",
	exportFileName,
	exportFile;

	//JPG export options
var jpgExportType = ExportType.JPEG;
	jpgExportOptions = new ExportOptionsJPEG();
	jpgExportOptions.artBoardClipping = true;
	jpgExportOptions.qualitySetting = 100;
	jpgExt = ".jpg";

	//SVG export options
var svgExportType = ExportType.SVG;
var svgExportOptions = new ExportOptionsSVG();
	svgExportOptions.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
var svgExt = ".svg";

var exportType = svgExportType;
var exportOptions = svgExportOptions;
var exportExtension = svgExt;

if(devMode)
{
	uvFolder = Folder(desktopPath + "/automation/mockup_exporter/uv_maps");
	exportPath = desktopPath + "/3D_Mockup_test";
	// exportFileName = layers[0].name;
}