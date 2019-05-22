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
function container()
{

	var valid = true;

	// //Production Utilities
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	
	//Dev Utilities
	// eval("#include \"/Volumes/Macintosh HD/Users/will.dowling/Desktop/automation/utilities/Utilities_Container.js\"");
	// eval("#include \"/Volumes/Macintosh HD/Users/will.dowling/Desktop/automation/utilities/Batch_Framework.js\"");


	/*****************************************************************************/
	//==============================  Components  ===============================//

	if(user === "will.dowling")
	{
		logDest.push(File(desktopPath + "/automation/logs/mockup_exporter_dev_log.txt"));
	}
	else
	{
		logDest.push(File("/Volumes/Customization/Library/Scripts/Script Resources/Data/.script_logs/mockup_exporter_log.txt"));
	}

	var devComponents = desktopPath + "/automation/mockup_exporter/components";
	var prodComponents = "/Volumes/Customization/Library/Scripts/Script Resources/components/mockup_exporter"

	var compFiles = includeComponents(devComponents,prodComponents,true);
	if(compFiles && compFiles.length)
	{
		for(var x=0,len=compFiles.length;x<len;x++)
		{
			try
			{
				eval("#include \"" + compFiles[x].fsName + "\"");
			}
			catch(e)
			{
				errorList.push("Failed to include the component: " + compFiles[x].name);
				log.e("Failed to include the component: " + compFiles[x].name + "::System Error Message: " + e + "::System Error Line: " + e.line);
				valid = false;
			}
		}
	}
	else
	{
		valid = false;
		errorList.push("Failed to find any of the necessary components for this script to work.");
		log.e("Failed to include any components. Exiting script.");
	}

	//=============================  /Components  ===============================//
	/*****************************************************************************/



	/*****************************************************************************/
	//=================================  Procedure  =================================//
	
	function execute()
	{
		initMockupExporter();

		devMode = true;

		//create the cleanup_swatches action
		createCleanupSwatchesAction();

		if(devMode)
		{
			updateWrongPlaceholderColors();
		}

		layers[0].name = layers[0].name.replace("FD_","FD-");
		layers[0].name = layers[0].name.replace("_0","_10");

		log.l("Mockup Exporter Initialized for document: " + docRef.name);
		if(valid)
		{
			valid = getGarments(docRef);
		}

		if(valid)
		{
			log.l("Successfully gathered garments.");
			log.l("garmentsNeeded = " + garmentsNeeded);
			valid = masterLoop();
		}

		removeAction("cleanup_swatches");
	}

	log.h("Beginning Blank SVG Exporter Script")

	batchInit(execute,"Exported svg versions of blank styles");


	//=================================  /Procedure  =================================//
	/*****************************************************************************/

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}

	printLog();

	return valid

}
container();