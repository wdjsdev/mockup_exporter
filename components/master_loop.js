/*
	Component Name: master_loop
	Author: William Dowling
	Creation Date: 16 August, 2018
	Description: 
		perform the mockup export process for
		each layer in the garmentsNeeded array
	Arguments
		none
	Return value
		success boolean

*/

function masterLoop ()
{
	var doc = app.activeDocument;
	var lays = afc( doc, "layers" );
	var layVisStates = lays.map( function ( l ) { return l.visible; } );
	var layLockStates = lays.map( function ( l ) { return l.locked; } );

	lays.forEach( function ( l ) { l.visible = true; l.locked = false; } );

	//garmentsNeeded is an array of template layers
	for ( var x = 0, len = garmentsNeeded.length; x < len; x++ )
	{
		log.l( "Beginning master loop number: " + ( x + 1 ) + " for garment: " + garmentsNeeded[ x ].name );

		if ( devMode )
		{
			addParamColors();
			normalizeLayerName();
		}

		curGarmentLayer = garmentsNeeded[ x ];
		curGarmentCode = getCode( curGarmentLayer.name );

		if ( curGarmentCode )
		{
			//add the garment code to the end of the export path
			//so that the files are saved into subfolders by garment code
			//all the FD-161 mockups will go into a FD-161 folder.
			networkExportPath += curGarmentCode + "/";
		}
		else
		{
			log.e( "failed to determine the garment code. continuing loop" );
			continue;
		}


		//add a script message about FD-400 mockups to remind the user to
		//send both adult and youth mockups to customer.
		if ( curGarmentCode.match( /FD-400/i ) )
		{
			messageList.push( "Please make sure to send both adult and youth mockups of the FD-400 to customer." );
		}


		var paramLayerExists = false;
		for ( var y = 0, ylen = mockupLay.layers.length; y < ylen && !paramLayerExists; y++ )
		{
			if ( mockupLay.layers[ y ].name === "paramcolors" && mockupLay.layers[ y ].pageItems.length )
			{
				paramLayerExists = true;
			}
		}
		if ( !paramLayerExists )
		{
			addParamColors();
			getParamColorValues();
		}

		if ( !devMode )
		{
			curOrderNumber = getOrderNumber( docRef );
			printDesignNumberOnMockup();
			if ( !curOrderNumber )
			{
				//file is unsaved
				break;
			}
		}

		getMockupSize();

		if ( !openUV( curGarmentCode ) )
		{
			continue;
		}
		log.l( "UV File successfully opened." );
		if ( !getMasterLayers() )
		{
			continue;
		}

		if ( !duplicateMockupSizePiecesToTemplate( uvFile ) )
		{
			log.l( "Successfully found the necessary layers in the Master File." );
			continue;
		}

		uvFile.activate();

		if ( mockupExporterGarmentData[ curGarmentCode ] && mockupExporterGarmentData[ curGarmentCode ].flipCollars )
		{
			flipCollars();
		}

		if ( !scalePiecesToFitGuides() )
		{
			continue;
		}

		log.l( "Successfully scaled and  positioned the pieces on the UV Map." );

		if ( !recolorDisplayBlocks() )
		{
			log.e( "Failed while recoloring the display blocks." );
			errorList.push( "Failed while recoloring the display blocks." );
			continue;
		}

		if ( devMode )
		{
			if ( !removePossiblePolygons() )
			{
				log.e( "Failed while attempting to fix compound paths.." );
				errorList.push( "Failed while attempting to fix compound paths.." );
				continue;
			}
		}



		if ( devMode )
		{
			updateParamColorNames();
		}
		else
		{
			cleanupUVFile();
		}



		exportUV();

		if ( blankMode )
		{
			filesToClose.push( uvFile );
		}


	}

	lays.forEach( function ( l, i ) { l.visible = layVisStates[ i ]; l.locked = layLockStates[ i ]; } );

	return true;
}