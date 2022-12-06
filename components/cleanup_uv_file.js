/*
	Component Name: cleanup_uv_file
	Author: William Dowling
	Creation Date: 11 July, 2019
	Description: 
		tidy up the layers and make sure only the correct stuff is visible
	Arguments
		none
	Return value
		void

*/

function cleanupUVFile()
{
	var settings = 
	{
		"uv":
		{
			"locked": true,
			"visible": true
		},
		"Art":
		{
			"locked": false,
			"visible": true
		},
		"paramcolors":
		{
			"locked": false,
			"visible": true
		},
		"Guides":
		{
			"locked": false,
			"visible": true
		},
		"BG":
		{
			"locked": true,
			"visible": true
		},
		"production colors":
		{
			"locked": true,
			"visible": true
		},
		"Targets":
		{
			"locked": false,
			"visible": false
		}
	}

	for(var lay in settings)
	{
		var thisLay = findSpecificLayer(uvLayers, lay, lay.match(/art/i) ? "imatch" : "any");
		if(thisLay)
		{
			thisLay.locked = settings[lay].locked;
			thisLay.visible = settings[lay].visible;
		}
		else
		{
			$.writeln("Failed to find layer " + lay);
		}
	}

}