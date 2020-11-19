

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


	/*****************************************************************************/
	//==============================  Components  ===============================//


	if(user === "will.dowling")
	{
		DEV_LOGGING = true;
	}

	// var prodComponents = componentsPath + "mockup_exporter";
	var devComponents = desktopPath + "automation/mockup_exporter/components/";
	var compFiles = includeComponents(devComponents,devComponents,true);
	if(compFiles && compFiles.length)
	{
		for(var x=0,len=compFiles.length;x<len;x++)
		{
			try
			{
				eval("#include \"" + compFiles[x].fsName + "\"");
				log.l("Included " + compFiles[x].fullName);
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


	log.h("Beginning execution of Mockup Exporter Script.");

	//create the cleanup_swatches action
	// createCleanupSwatchesAction();
	createAction("cleanup_swatches",CLEANUP_SWATCHES_ACTION_STRING);

	//run the script
	initMockupExporter();

	autoMode = true;

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


}
container();