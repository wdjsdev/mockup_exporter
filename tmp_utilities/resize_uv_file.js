function test()
{
	var valid = true;
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	var obj = {};
	var arr = [];

	var newAbSize = 2048;

	unlockDoc(docRef);

	function resizeArtboard()
	{
		var rect = aB[0].artboardRect;
		var h = rect[2]-rect[0];
		var w = rect[1] - rect[3];
		var hCenter = rect[0] + (h/2);
		var vCenter = rect[1] - (w/2);

		docRef.selection = null;
		var tmpBlock = docRef.pathItems.rectangle(vCenter + newAbSize/2, hCenter - newAbSize/2, newAbSize, newAbSize);
		tmpBlock.selected = true;
		app.executeMenuCommand("Fit Artboard to selected Art");

		tmpBlock.remove();
	}

	function resizeGuides()
	{
		var guidesLay = findSpecificLayer(docRef,"Guides");

		if(guidesLay)
		{
			docRef.selection = null;
			guidesLay.hasSelectedArtwork = true;
			app.executeMenuCommand("group");

			var guidesGroup = docRef.selection[0];
			guidesGroup.resize(50,50,true,true,true,true,0,Transformation.CENTER);

			app.executeMenuCommand("ungroup");
			guidesLay.locked = true;
		}
	}
	

	resizeArtboard();
	resizeGuides();	
}
test();