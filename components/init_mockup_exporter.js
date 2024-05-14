function initMockupExporter ()
{
	docRef = app.activeDocument;
	layers = docRef.layers;
	mockupLay = findSpecificLayer( layers[ 0 ], "Mockup" );
	aB = docRef.artboards;
	swatches = docRef.swatches;
	garmentsNeeded = [];
	tmpLay = null;
	paramGroup = null;
}