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
	ppLay, //prepress layer for a given garment
	mockupLayer, //mockup layer for a given garment
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
	uvSwatches,
	uvArtLayer,
	uvParamLayer,
	uvGuidesLayer;