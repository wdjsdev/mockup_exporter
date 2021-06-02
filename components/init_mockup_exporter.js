function initMockupExporter()
{
	docRef = app.activeDocument;
	layers = docRef.layers;
	mockupLay = findSpecificLayer(layers[0],"Mockup");
	aB = docRef.artboards;
	swatches = docRef.swatches;
	garmentsNeeded = [];
	tmpLay = null;
	paramGroup = null;

	//create the cleanup_swatches action
	// createCleanupSwatchesAction();
	createAction("cleanup_swatches",CLEANUP_SWATCHES_ACTION_STRING);
	log.l("created cleanup swatches action");
}