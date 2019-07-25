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
		"Targets":
		{
			"locked": false,
			"visible": false
		},
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
		}
	}

	for(var lay in settings)
	{
		try
		{
			var thisLay = uvLayers[lay];
			thisLay.locked = settings[lay].locked;
			thisLay.visible = settings[lay].visible;
		}
		catch(e){};
	}

}