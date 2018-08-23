/*
	Component Name: mockup_exporter_global_variables
	Author: William Dowling
	Creation Date: 07 August, 2018
	Description: 
		set of global variables for the mockup exporter script
*/

	//master file variables
var docRef = app.activeDocument,
	layers = docRef.layers,
	aB = docRef.artboards,
	swatches = docRef.swatches,
	artLay, //artwork layer for the given garment
	ppLay, //prepress layer for the given garment
	mockupLayer, //mockup layer for the given garment
	paramLayer, //sublayer inside mockup layer that contains paramcolor blocks
	


	//garment variables
	garmentsNeeded = [],
	curGarmentLayer,
	mockupSize,
	tmpLay,
	tmpArtGroup,
	tmpParamGroup,



	//uv file variables
	uvFolder = Folder(desktopPath + "/automation/mockup_exporter/uv_files"),
	uvFile,
	uvLayers,
	uvArtboards,
	uvSwatches,
	uvArtLayer,
	uvParamLayer,
	uvGuidesLayer;