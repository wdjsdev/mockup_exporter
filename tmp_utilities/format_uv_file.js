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

	var sel = docRef.selection;

	if (!sel)
	{
		alert("make selection");
		return;
	}

	var guidesLay = layers["Guides"];

	var newGuide,dim;
	for (var x = sel.length - 1; x >= 0; x--)
	{
		newGuide = guidesLay.pathItems.rectangle(sel[x].top,sel[x].left,sel[x].width,sel[x].height);
		newGuide.filled = false;
		newGuide.stroked = false;
		newGuide.name = sel[x].name;
		newGuide.guides = true;
		sel[x].remove();
	}

}
test();