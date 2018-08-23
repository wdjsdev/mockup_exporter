/*
	Component Name: mockup_exporter_special_instructions
	Author: William Dowling
	Creation Date: 23 August, 2018
	Description: 
		object holding the special functions that must 
		be executed for a given garment code when
		executing the Mockup_Exporter.jsx script.

*/

var mockupExporterSpecialInstructions = 
{
	"FD-872": function()
	{
		try
		{
			var drawstringDisp = uvArtLayer.pageItems["drawstrings"];
		}
		catch(e)
		{
			errorList.push("Failed to find the drawstring display in the UV Map File.");
			return false;
		}

		try
		{
			var dsParam = uvParamLayer.pageItems[uvParamLayer.pageItems.length - 2];
			var dsParamColor = dsParam.fillColor.spot.name;
			var dsSwatch = swatches[dsParamColor];
		}
		catch(e)
		{
			errorList.push("Failed to set the color for the drawstring display.");
			return false;
		}

		app.activeDocument.selection = null;


		drawstringDisp.selected = true;

		app.activeDocument.defaultFillColor = dsParam.fillColor;
		return true;
	}
}