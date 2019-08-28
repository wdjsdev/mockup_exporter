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
		addParamColors();
	}

	log.h("Beginning execution of Add Param Blocks Script.");

	//create the cleanup_swatches action
	// createCleanupSwatchesAction();
	createAction("cleanup_swatches",CLEANUP_SWATCHES_ACTION_STRING);

	//run the script
	execute();

	//remove the cleanup_swatches action
	try
	{
		removeAction("cleanup_swatches");
		// app.unloadAction("cleanup_swatches","");
	}
	catch(e)
	{
		//log.l("Failed to unload the apply swatch action.. That probably means the action didn't get created properly..");
	}

	//=================================  /Procedure  =================================//
	/*****************************************************************************/

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}

	printLog();

	return valid;

}
container();