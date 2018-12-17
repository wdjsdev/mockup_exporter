#target Illustrator
function test()
{
	var valid = true;
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;

	// var replaceStr = "XL ";
	var replaceStr = "32Wx34I ";

	var guidesLay = findSpecificLayer(layers,"Guides");
	if(guidesLay)
	{
		guidesLay.locked = false;
		guidesLay.visible = true;
		guidesLay.remove();
	}

	guidesLay = layers.add();
	guidesLay.name = "Guides";

	var artLay = findSpecificLayer(layers,"Art");
	if(!artLay)
	{
		artLay = layers.add();
		artLay.name = "Art";
	}

	var paramLay = findSpecificLayer(layers,"paramcolors");
	if(!paramLay)
	{
		paramLay = layers.add();
		paramLay.name = "paramcolors";
	}

	function drawGuide(item)
	{
		var newGuide = guidesLay.pathItems.rectangle(item.top,item.left,item.width,item.height);
		newGuide.filled = false;
		newGuide.stroked = false;
		newGuide.name = item.name.replace(replaceStr,"");
		newGuide.moveToBeginning(guidesLay);
		item.remove();
	}

	for(var x = docRef.selection.length-1;x>=0;x--)
	{	
		drawGuide(docRef.selection[x]);
	}
	
}
test();