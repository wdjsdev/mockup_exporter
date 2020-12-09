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
	var scriptName = "3D_mockup_exporter";

	function getUtilities()
	{
		var result = [];
		var utilPath = "/Volumes/Customization/Library/Scripts/Script_Resources/Data/";
		var ext = ".jsxbin"

		//check for dev utilities preference file
		var devUtilitiesPreferenceFile = File("~/Documents/script_preferences/dev_utilities.txt");

		if(devUtilitiesPreferenceFile.exists)
		{
			devUtilitiesPreferenceFile.open("r");
			var prefContents = devUtilitiesPreferenceFile.read();
			devUtilitiesPreferenceFile.close();
			if(prefContents === "true")
			{
				utilPath = "~/Desktop/automation/utilities/";
				ext = ".js";
			}
		}

		if($.os.match("Windows"))
		{
			utilPath = utilPath.replace("/Volumes/","//AD4/");
		}

		result.push(utilPath + "Utilities_Container" + ext);
		result.push(utilPath + "Batch_Framework" + ext);

		if(!result.length)
		{
			valid = false;
			alert("Failed to find the utilities.");
		}
		return result;

	}

	var utilities = getUtilities();
	for(var u=0,len=utilities.length;u<len;u++)
	{
		eval("#include \"" + utilities[u] + "\"");	
	}

	if(!valid)return;


	/*****************************************************************************/
	//==============================  Components  ===============================//

	logDest.push(getLogDest());

	if(user === "will.dowling")
	{
		DEV_LOGGING = true;
	}

	var devComponents = desktopPath + "/automation/mockup_exporter/components";
	var prodComponents = componentsPath + "mockup_exporter";

	var compFiles = includeComponents(devComponents,prodComponents,false);
	if(compFiles && compFiles.length)
	{
		for(var x=0,len=compFiles.length;x<len;x++)
		{
			try
			{
				eval("#include \"" + compFiles[x].fullName + "\"");
			}
			catch(e)
			{
				// errorList.push("Failed to include the component: " + compFiles[x].name);
				errorList.push("Failed to include the component: " + compFiles[x].name + "::System Error Message: " + e + "::System Error Line: " + e.line);
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
		

		//check to see if the file has been saved (or at least that it isn't called "untitled")
		//if so, save it again.
		if(docRef.name.toLowerCase().indexOf("untitled") === -1)
		{
			docRef.save();
		}


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
	}



	initMockupExporter();

	printDesignNumberOnMockup();


	log.h("Exporting standard jpg mockup.");

	exportJpgMockup();

	log.h("Beginning execution of Mockup Exporter Script.");

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

	docRef.activate();


	if(docRef.name.toLowerCase().indexOf("untitled") === -1)
	{
		docRef.save();
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