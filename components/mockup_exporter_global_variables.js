/*
	Component Name: mockup_exporter_global_variables
	Author: William Dowling
	Creation Date: 07 August, 2018
	Description: 
		set of global variables for the mockup exporter script
*/



/*
	Mockup Sizes Expected

	Male: 	33" Chest
			32" Waist
			32" Inseam

	Female: 33" Chest 
			25" Waist 
			34" Hips 
			33" Inseam

*/

	////////////

	//dev mode

	////////////
	
var devMode = false;

	////////////

	//dev mode

	////////////

	//get the mockup_exporter_garment_data.js file
var dataFile = File(dataPath + "/mockup_exporter_garment_data.js");
eval("#include \"" + dataFile.fsName + "\"");


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
	waistSize = "",
	placeholderSwatchLetter = "B";

	//garment variables
var garmentsNeeded = [],
	curGarmentLayer,
	curGarmentCode,
	curGarmentDesignId,
	mockupSize,
	tmpLay,
	tmpArtGroup,
	tmpParamGroup,
	//COLAR_COLORS is a list of colors that should be removed from the uvFile before exporting.
	COLLAR_COLORS = ["Collar Info B", "Collar Info 2 B", "Care Label B", "Collar B", "Collar 2 B"];



	//uv file variables
var uvFolder = Folder("/Volumes/Customization/Library/Scripts/Script Resources/Files/uv_maps"),
	uvFile,
	uvLayers,
	uvArtboards,
	uvSwatches,
	uvArtLayer,
	uvParamLayer,
	uvGuidesLayer,
	uvProdColorsLayer;



	//export variables
var appendages = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
	exportPath = "/Volumes/Customization/Library/Scripts/Script Resources/Files/3D_Builder_SVGs",
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

var devExportPath = desktopPath + "/3D_Builder_SVGs";