/*
	Component Name: print_design_number_on_mockup
	Author: William Dowling
	Creation Date: 20 November, 2020
	Description: 
		get the design number and put it into a textFrame
		on the information layer, just under the order number
	Arguments
		none
	Return value
		void

*/

function printDesignNumberOnMockup ()
{
	infoLayer = findSpecificLayer( layers[ 0 ], "Information" );
	if ( infoLayer )
	{
		var designIdFrame;
		if ( devMode )
		{
			exportFileName = layers[ 0 ].name;
		}
		else
		{
			infoLayer.locked = false;
			designIdFrame = findSpecificPageItem( infoLayer, "design Id", "imatch" );
			if ( designIdFrame )
			{
				curGarmentDesignId = designIdFrame.contents;
			}
			else
			{
				curGarmentDesignId = getCurGarmentDesignId();
				// if(!devMode)
				// {
				// 	curGarmentDesignId = getCurGarmentDesignId();
				// }

				var position = [ 19, -69 ];
				try
				{
					var orderNumberFrame = infoLayer.textFrames[ "Order Number" ];
					position = [ orderNumberFrame.left, orderNumberFrame.top - 12 ];
				}
				catch ( e ) { };
				designIdFrame = infoLayer.textFrames.add();
				designIdFrame.name = "Design ID";
				designIdFrame.contents = curGarmentDesignId;
				designIdFrame.position = position;

			}
			exportFileName = curGarmentDesignId + "_" + curOrderNumber + "_mockup";

			try
			{
				var infoSwatch = makeNewSpotColor( "Info B", "CMYK", BOOMBAH_APPROVED_COLOR_VALUES[ "Info B" ] );
				designIdFrame.textRange.characterAttributes.fillColor = infoSwatch.color;
				designIdFrame.textRange.characterAttributes.fillColor.tint = 0;
			}
			catch ( e )
			{
				log.e( "Failed to change the fill color and/or tint of the design number textFrame..::e = " + e + "::e.line = " + e.line );
			}

			infoLayer.locked = true;
		}
	}
	else
	{
		errorList.push( "Failed to find the Information layer for " + layers[ 0 ].name );
		return false;
	}
}