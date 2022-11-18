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
		//check for dev mode
		var devUtilitiesPreferenceFile = File( "~/Documents/script_preferences/dev_utilities.txt" );
		var devUtilPath = "~/Desktop/automation/utilities/";
		var devUtils = [ devUtilPath + "Utilities_Container.js", devUtilPath + "Batch_Framework.js" ];
		function readDevPref ( dp ) { dp.open( "r" ); var contents = dp.read() || ""; dp.close(); return contents; }
		if ( readDevPref( devUtilitiesPreferenceFile ).match( /true/i ) )
		{
			$.writeln( "///////\n////////\nUsing dev utilities\n///////\n////////" );
			return devUtils;
		}






		var utilNames = [ "Utilities_Container" ];

		//not dev mode, use network utilities
		var OS = $.os.match( "Windows" ) ? "pc" : "mac";
		var ad4 = ( OS == "pc" ? "//AD4/" : "/Volumes/" ) + "Customization/";
		var drsv = ( OS == "pc" ? "O:/" : "/Volumes/CustomizationDR/" );
		var ad4UtilsPath = ad4 + "Library/Scripts/Script_Resources/Data/";
		var drsvUtilsPath = drsv + "Library/Scripts/Script_Resources/Data/";


		var result = [];
		for ( var u = 0, util; u < utilNames.length; u++ )
		{
			util = utilNames[ u ];
			var ad4UtilPath = ad4UtilsPath + util + ".jsxbin";
			var ad4UtilFile = File( ad4UtilsPath );
			var drsvUtilPath = drsvUtilsPath + util + ".jsxbin"
			var drsvUtilFile = File( drsvUtilPath );
			if ( drsvUtilFile.exists )
			{
				result.push( drsvUtilPath );
			}
			else if ( ad4UtilFile.exists )
			{
				result.push( ad4UtilPath );
			}
			else
			{
				alert( "Could not find " + util + ".jsxbin\nPlease ensure you're connected to the appropriate Customization drive." );
				valid = false;
			}
		}

		return result;

	}



	var utilities = getUtilities();




	for ( var u = 0, len = utilities.length; u < len && valid; u++ )
	{
		eval( "#include \"" + utilities[ u ] + "\"" );
	}

	log.l( "Using Utilities: " + utilities );


	if ( !valid ) return;


	/*****************************************************************************/
	//==============================  Components  ===============================//

	logDest.push( getLogDest() );

	////////////////////////
	////////ATTENTION://////
	//
	//		temp live logging
	LIVE_LOGGING = false;
	//
	////////////////////////

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
		docRef = app.activeDocument;
		getItemDimension( docRef.pageItems[ 0 ] );
	}
	// testFunction();
	// return;



	function execute ()
	{
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
	}


	var docRef = app.activeDocument;
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

	docRef.activate();

	log.h( "Exporting standard jpg mockup." );
	exportJpgMockup();

	if ( docRef.name.toLowerCase().indexOf( "untitled" ) === -1 )
	{
		log.l( "saving master file with file name: " + masterFileSaveName );
		docRef.saveAs( File( masterFileSaveName ) );
	}

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