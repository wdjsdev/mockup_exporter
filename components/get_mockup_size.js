/*
	Component Name: get_mockup_size
	Author: William Dowling
	Creation Date: 16 August, 2018
	Description: 
		parse the garment code to figure out
		what the correct mockup size is
	Arguments
		none
	Return value
		void

*/

function getMockupSize ()
{
	var curData;

	// eval("#include \"" + centralLibraryFile.fsName + "\"");
	eval( "#include \"" + centralLibraryPath + "\"" );
	if ( prepressInfo )
	{
		curData = getLibraryEntry( prepressInfo, curGarmentCode );

		if ( curData )
		{
			mockupSize = curData.mockupSize;
			if ( mockupSize.match( /i$/i ) )
			{
				sizeType = "var";
				waistSize = curData.waistMockupSize;
				if ( !waistSize )
				{
					waistSize = uiPrompt( "Enter the mockup waist size." );
					if ( !waistSize )
					{
						errorList.push( "Failed to determine the proper mockup size." );
						valid = false;
						return;
					}
				}
			}
		}


	}

}