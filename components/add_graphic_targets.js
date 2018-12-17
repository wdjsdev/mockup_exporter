/*
	Component Name: add_graphic_targets
	Author: William Dowling
	Creation Date: 18 September, 2018
	Description: 
		add named rectangles in specific locations to
		correspond with the graphic target locations
		used by the builder.

		This is a temporary component and will not be used
		for production version of the mockupExporter script.
		It is only used to help build the blank styles.
	Arguments
		none
	Return value
		success boolean

*/

function addGraphicTargets()
{
	var doc = app.activeDocument;
	var layers = doc.layers;

	var targetFileName = getCode(docRef.layers[0].name) + "_art_targets.ai";

	//get the targets file
	try
	{
		var targetSourceFile = app.documents[targetFileName];
	}
	catch(e)
	{
		var targetSourceFile = app.open(File(uvFolder.fsName + "/targets/" + targetFileName));
	}
	targetSourceFile.activate();
	targetSourceFile.layers[0].hasSelectedArtwork = true;
	app.copy();


	doc.activate();
	var targetLayer = layers.add();
	targetLayer.name = "Artwork Targets";
	app.executeMenuCommand("pasteInPlace");

}