#target Illustrator
function setupUv()
{
	var valid = true;

	//Production Utilities
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	
	#include "extract_production_colors.js";
	#include "add_guide_boxes_to_uv.js";

	extractProductionColors();
	app.redraw();
	addGuides();

	app.doScript("rmswatches","rmswatches");
}
setupUv();