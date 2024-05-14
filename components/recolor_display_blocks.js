/*
	Component Name: recolor_display_blocks
	Author: William Dowling
	Creation Date: 16 May, 2019
	Description: 
		search the database to determine whether any
		non-artwork display colors are present and
		if so, apply the appropriate color 
	Arguments
		none
	Return value
		success boolean

*/

function recolorDisplayBlocks ()
{
	var result = true;
	var curData = mockupExporterGarmentData[ curGarmentCode ];
	var index, paramBlock, display;
	if ( curData )
	{
		for ( var x = 0, len = curData.updateDisplay.length; x < len; x++ )
		{
			recolorBlock( curData.updateDisplay[ x ].name, curData.updateDisplay[ x ].seq )
		}
	}

	return result;

	function recolorBlock ( name, index )
	{
		if ( index === -1 )
		{
			index = 0;
		}

		display = findSpecificPageItem( uvArtLayer, name, "any" );
		paramBlock = uvParamLayer.pageItems.length > index ? uvParamLayer.pageItems[ index ] : undefined;

		if ( !display )
		{
			errorList.push( "The UV Map file is missing a display block called " + name );
			log.e( "UV Map file doesn't have a display block called: " + name );
			result = false;
		}


		// try
		// {
		// 	var display = uvArtLayer.pageItems[name];
		// 	paramBlock = uvParamLayer.pageItems[index];
		// 	display.fillColor = paramBlock.fillColor;
		// }
		// catch(e)
		// {
		// 	log.e("Failed to recolor the " + name + " display.");
		// 	errorList.push("The UV Map file is either missing a \"display block\" called: " + name + ", or a param block called: C" + index + ".");
		// 	result = false;
		// }
	}
}