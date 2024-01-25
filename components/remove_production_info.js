/*
	Component Name: remove_production_info
	Author: William Dowling
	Creation Date: 13 August, 2018
	Description: 
		remove all production color info from the
		document to facilitate accurate sizing
		and placement, as well as preventing any
		extraneous colors from appearing on 3d mockup
	Arguments
		none
	Return value
		success boolean

*/

function removeProductionInfo ()
{
	var colorsToRemove = BOOMBAH_PRODUCTION_COLORS;

	//add the collar colors to the list of colors to remove
	colorsToRemove = colorsToRemove.concat( COLLAR_COLORS );
	var toBeRemoved = [];

	var curSwatch;
	for ( var x = 0, len = uvSwatches.length; x < len; x++ )
	{
		curSwatch = uvSwatches[ x ];
		if ( colorsToRemove.indexOf( curSwatch.name ) > -1 && !curSwatch.name.match( /jock/i ) )
		{
			findProdColor( curSwatch );
		}
	}

	for ( var x = toBeRemoved.length - 1; x >= 0; x-- )
	{
		try
		{
			toBeRemoved[ x ].remove();
		}
		catch ( e ) { }
	}

	return true;

	function findProdColor ( swatch )
	{
		var curSwatch;
		uvFile.selection = null;
		app.redraw();
		// var tmpColorValues = {
		// 	cyan: 0,
		// 	magenta: 0,
		// 	yellow: 0,
		// 	black: 0
		// }
		// curSwatch = makeNewSpotColor(swatchName, "CMYK", tmpColorValues);

		uvFile.defaultFillColor = swatch.color;
		app.executeMenuCommand( "Find Fill Color menu item" );
		pushRmColors( uvFile.selection );
		uvFile.selection = null;

		uvFile.defaultStrokeColor = swatch.color;
		app.executeMenuCommand( "Find Stroke Color menu item" );
		pushRmColors( uvFile.selection );
		uvFile.selection = null;

		function pushRmColors ( arr )
		{
			for ( var x = 0, len = arr.length; x < len; x++ )
			{
				toBeRemoved.push( arr[ x ] );
			}
		}
	}
}