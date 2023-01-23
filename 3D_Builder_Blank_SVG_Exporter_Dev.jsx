/*

Script Name: export_mockup
Author: William Dowling
Build Date: 07 August, 2018
Description: open the 3d mockup template file for the current garment
				find the mockup size for the current garment
				and duplicate one of each garment piece
				into the 3d mockup template, update the colors
				to match the paramcolor blocks. align the pieces
				to the matching guide boxes and export the file
				for the 3d builder. 
	
	
*/
#target Illustrator
function container ()
{

	var valid = true;
	var scriptName = "3d_builder_blank_svg_exporter"

	function getUtilities ()
	{
		var utilNames = [ "Utilities_Container" ]; //array of util names
		var utilFiles = []; //array of util files
		//check for dev mode
		var devUtilitiesPreferenceFile = File( "~/Documents/script_preferences/dev_utilities.txt" );
		function readDevPref ( dp ) { dp.open( "r" ); var contents = dp.read() || ""; dp.close(); return contents; }
		if ( devUtilitiesPreferenceFile.exists && readDevPref( devUtilitiesPreferenceFile ).match( /true/i ) )
		{
			$.writeln( "///////\n////////\nUsing dev utilities\n///////\n////////" );
			var devUtilPath = "~/Desktop/automation/utilities/";
			utilFiles = [ devUtilPath + "Utilities_Container.js", devUtilPath + "Batch_Framework.js" ];
			return utilFiles;
		}

		var dataResourcePath = customizationPath + "Library/Scripts/Script_Resources/Data/";

		for ( var u = 0; u < utilNames.length; u++ )
		{
			var utilFile = new File( dataResourcePath + utilNames[ u ] + ".jsxbin" );
			if ( utilFile.exists )
			{
				utilFiles.push( utilFile );
			}

		}

		if ( !utilFiles.length )
		{
			alert( "Could not find utilities. Please ensure you're connected to the appropriate Customization drive." );
			return [];
		}


		return utilFiles;

	}
	var utilities = getUtilities();

	for ( var u = 0, len = utilities.length; u < len && valid; u++ )
	{
		eval( "#include \"" + utilities[ u ] + "\"" );
	}

	if ( !valid || !utilities.length ) return;

	DEV_LOGGING = user === "will.dowling";





	/*****************************************************************************/
	//==============================  Components  ===============================//

	logDest.push( getLogDest() );

	var devComponents = desktopPath + "automation/mockup_exporter/components";
	var prodComponents = componentsPath + "mockup_exporter"

	var compFiles = includeComponents( devComponents, prodComponents, false );
	var curFilePath;
	if ( compFiles && compFiles.length )
	{
		for ( var x = 0, len = compFiles.length; x < len; x++ )
		{
			// curFilePath = compFiles[x].fsName.toString().replace(/\\/g,"\\\\");
			curFilePath = compFiles[ x ].fullName;
			try
			{
				eval( "#include \"" + curFilePath + "\"" );
				log.l( "Successfully included: " + curFilePath );
			}
			catch ( e )
			{
				errorList.push( "Failed to include the component: " + compFiles[ x ].name );
				log.e( "Failed to include the component: " + compFiles[ x ].name + "::System Error Message: " + e + "::System Error Line: " + e.line );
				valid = false;
			}
		}
	}
	else
	{
		valid = false;
		errorList.push( "Failed to find any of the necessary components for this script to work." );
		log.e( "Failed to include any components. Exiting script." );
	}


	//=============================  /Components  ===============================//
	/*****************************************************************************/



	/*****************************************************************************/
	//=================================  Procedure  =================================//

	function execute ()
	{
		initMockupExporter();

		devMode = true;
		blankMode = true;

		//create the cleanup_swatches action
		// createCleanupSwatchesAction();
		createAction( "cleanup_swatches", CLEANUP_SWATCHES_ACTION_STRING );

		if ( devMode )
		{
			updateWrongPlaceholderColors();
		}

		layers[ 0 ].name = layers[ 0 ].name.replace( "FD_", "FD-" );
		layers[ 0 ].name = layers[ 0 ].name.replace( "_0", "_10" );

		log.l( "Mockup Exporter Initialized for document: " + docRef.name );
		if ( valid )
		{
			valid = getGarments( docRef );
		}

		if ( valid )
		{
			log.l( "Successfully gathered garments." );
			log.l( "garmentsNeeded = " + garmentsNeeded );
			valid = masterLoop();
		}

		removeAction( "cleanup_swatches" );
	}

	log.h( "Beginning Blank SVG Exporter Script" )

	batchInit( execute, "Exported svg versions of blank styles" );
	// execute();


	//=================================  /Procedure  =================================//
	/*****************************************************************************/

	if ( errorList.length > 0 )
	{
		sendErrors( errorList );
	}

	printLog();

	return valid

}
container();