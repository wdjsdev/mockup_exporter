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
	var scriptName = "3D_mockup_exporter";

	function getUtilities ()
	{
		var dataResourcePath = customizationPath + "Library/Scripts/Script_Resources/Data/";
		var devUtilPath = "~/Desktop/automation/utilities/";
		var utilPath = dataResourcePath + "Utilities_Container.jsxbin";
		var batchPath = dataResourcePath + "Batch_Framework.jsxbin";
		var utilFilePaths = [ utilPath ]; //array of util files
		var devUtilitiesPreferenceFile = File( "~/Documents/script_preferences/dev_utilities.txt" );
		function readDevPref ( dp ) { dp.open( "r" ); var contents = dp.read() || ""; dp.close(); return contents; }
		if ( devUtilitiesPreferenceFile.exists && readDevPref( devUtilitiesPreferenceFile ).match( /true/i ) )
		{
			utilFilePaths = [ devUtilPath + "Utilities_Container.js", devUtilPath + "Batch_Framework.js" ];
			return utilFilePaths;
		}

		if ( !File( utilFilePaths[ 0 ] ).exists )
		{
			alert( "Could not find utilities. Please ensure you're connected to the appropriate Customization drive." );
			return [];
		}

		return utilFilePaths;

	}
	var utilities = getUtilities();

	for ( var u = 0, len = utilities.length; u < len && valid; u++ )
	{
		eval( "#include \"" + utilities[ u ] + "\"" );
	}

	if ( !valid || !utilities.length ) return;


	/*****************************************************************************/
	//==============================  Components  ===============================//

	logDest.push( getLogDest() );


	if ( user === "will.dowling" )
	{
		DEV_LOGGING = true;
	}

	var devPath = desktopPath + "/automation/mockup_exporter/components";
	var prodPath = componentsPath + "mockup_exporter";

	// var compFiles = includeComponents(devComponents,prodComponents,false);
	var compFiles = getComponents( $.fileName.match( /dev/i ) ? devPath : prodPath );
	if ( compFiles && compFiles.length )
	{
		for ( var x = 0, len = compFiles.length; x < len; x++ )
		{
			eval( "#include \"" + compFiles[ x ].fullName + "\"" );
			log.l( "included: " + compFiles[ x ].fullName );
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


	//test function
	function testFunction ()
	{
		makeDataSheet();
	}
	// testFunction();
	// return;



	function execute ()
	{
		log.l( "Mockup Exporter Initialized for document: " + doc.name );
		if ( valid )
		{
			valid = getGarments( doc );
		}

		if ( valid )
		{
			log.l( "Successfully gathered garments." );
			log.l( "garmentsNeeded = " + garmentsNeeded );
			valid = masterLoop();
		}
	}


	var doc = app.activeDocument;
	if ( doc.name.match( /untitled/i ) )
	{
		alert( "Please save the document before running this script." );
		return;
	}
	initMockupExporter();








	log.h( "Beginning execution of Mockup Exporter Script." );

	//create the cleanup_swatches action
	// createCleanupSwatchesAction();
	createAction( "cleanup_swatches", CLEANUP_SWATCHES_ACTION_STRING );

	log.l( "Finished creating cleanup swatches action" );

	//run the script
	execute();



	//remove the cleanup_swatches action
	removeAction( "cleanup_swatches" );

	doc.activate();

	//make the data sheet
	makeDataSheet();

	log.l( "Exporting standard jpg mockup." );
	exportJpgMockup();



	log.l( "saving master file with file name: " + masterFileSaveName );
	app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
	doc.saveAs( File( masterFileSaveName ) );
	app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;

	//=================================  /Procedure  =================================//
	/*****************************************************************************/

	if ( errorList.length > 0 )
	{
		sendErrors( errorList );
	}
	if ( messageList.length )
	{
		sendScriptMessages( messageList );
	}

	printLog();

	return valid;

}
container();