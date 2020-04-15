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
		var scriptName = "3d_builder_blank_svg_exporter"

		function getUtilities(mode)
		{
			var result;
			var user,networkPath,localPath,utilPath;
			if($.os.match("Windows"))
			{
				networkPath = "//AD4/Customization/";
				// localPath = "~/Documents/Boombah_Script_Resources/utilities/";
				localPath = "~/Desktop/automation/utilities/";
			}
			else
			{
				user = $.getenv("USER");
				networkPath = "/Volumes/Customization/";
				localPath = "/Volumes/Macintosh HD/Users/" + user + "/Documents/Boombah_Script_Resources/"
			}

			if(mode === "dev")
			{
				utilPath = localPath;
			}
			else
			{
				utilPath = networkPath + "Library/Scripts/Script Resources/Data/";
			}
			
			if(Folder(utilPath).exists)
			{
				result = utilPath;
			}
			else{
				result = Folder.selectDialog("utilities").fullName + "/";
			}
			return result;

		}
		var utilitiesPath = getUtilities("dev");
		if(utilitiesPath)
		{
			eval("#include \"" + utilitiesPath + "Utilities_Container.js" + "\"");
			eval("#include \"" + utilitiesPath + "Batch_Framework.js" + "\"");
		}
		else
		{
			alert("Failed to find the utilities..");
			return false;	
		}

		LIVE_LOGGING = true;
		user = "will.dowling";





		/*****************************************************************************/
		//==============================  Components  ===============================//

		logDest.push(getLogDest());

		var devComponents = desktopPath + "automation/mockup_exporter/components";
		var prodComponents = componentsPath + "mockup_exporter"

		var compFiles = includeComponents(devComponents,prodComponents,false);
		var curFilePath;
		if(compFiles && compFiles.length)
		{
			for(var x=0,len=compFiles.length;x<len;x++)
			{
				// curFilePath = compFiles[x].fsName.toString().replace(/\\/g,"\\\\");
				curFilePath = compFiles[x].fullName;
				try
				{
					eval("#include \"" + curFilePath + "\"");
					log.l("Successfully included: " + curFilePath);
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
			// createCleanupSwatchesAction();
			createAction("cleanup_swatches",CLEANUP_SWATCHES_ACTION_STRING);

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

		// batchInit(execute,"Exported svg versions of blank styles");
		execute();


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