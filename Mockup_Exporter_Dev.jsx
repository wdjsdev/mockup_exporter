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

function container()
{

	var valid = true;

	// eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsx\"");
	eval("#include \"/Volumes/Macintosh HD/Users/will.dowling/Desktop/automation/utilities/Utilities_Container.js\"");

	//verify the existence of a document
	if(app.documents.length === 0)
	{
		errorList.push("You must have a document open.");
		sendErrors(errorList);
		return false;
	}


	/*****************************************************************************/
	//==============================  Components  ===============================//

	if(user === "will.dowling")
	{
		logDest.push(File(desktopPath + "/automation/logs/build_prod_file_dev_log.txt"));
	}
	else
	{
		logDest.push(File("/Volumes/Customization/Library/Scripts/Script Resources/Data/.script_logs/build_prod_file_log.txt"));
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
				// break;
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
	
	if(valid)
	{
		// curGarmentCode = layers[0].name;
		// mockupSize = "XL";
		// openUV("FD-872");
		// duplicateMockupSizePiecesToTemplate(uvFile);
		// uvFile.activate();
		// scalePiecesToFitGuides();

		valid = getGarments(docRef);
	}

	if(valid)
	{
		valid = masterLoop();
	}


	//=================================  /Procedure  =================================//
	/*****************************************************************************/

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}
	return valid

}
container();