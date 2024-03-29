/*
	Component Name: export_jpg_mockup
	Author: William Dowling
	Creation Date: 17 November, 2018
	Description: 
		export the first artboard in the document
		the first artboard SHOULD be the adult mockup..
		unless there is no adult garment in which case
		we do indeed want to export the youth version.
	Arguments
		none
	Return value
		void

*/

function exportJpgMockup()
{
	var doc = app.activeDocument;
	var ab = doc.artboards;

	var newFileName = decodeURI(doc.fullName.toString());
	log.l("newFileName = " + newFileName);
	newFileName = newFileName.replace(/\.ai[t]?/i,"");
	newFileName = newFileName.replace(/(master)|(prepress)/i,"Mockup");
	newFileName += ".jpg";
	log.l("converted newFileName to: " + newFileName);


	newFileName = decodeURI(newFileName);

	// newFileName = newFileName.replace(/(^.*users\/)|(^~\/)/i,homeFolderPath);
	newFileName = normalizeLocalFilePath(newFileName);

	if(os === "mac")
	{
		if(newFileName.indexOf("Volumes") === -1)
		{
			newFileName = "/Volumes" + newFileName;
		}
	}
	else if(user == "thell")
	{
		newFileName = newFileName.replace("C:","D:");
		newFileName = newFileName.replace(/\//g,"\\\\");
	}
	else
	{
		log.l("User is on a PC. converting forward slashes to backslashes");
		newFileName = decodeURI(newFileName.replace(/\//g,"\\\\"));
	}
	
	log.l("finished updating newFileName::newFileName = "+ newFileName);
	

	var actionString = EXPORT_JPG_HIGH_QUALITY_ACTION_STRING.join("\n");

	actionString = actionString.replace("**folder_char_length**",newFileName.length);
	actionString = actionString.replace("**hex_folder_path**",asciiToHex(newFileName));


	

	actionString = actionString.split("\n");
	
	try
	{
		createAction("export jpg",actionString);
		app.doScript("export jpg","export jpg");
		removeAction("export jpg");	
		log.l("Successfully exported jpg mockup.");
	}
	catch(e)
	{
		log.e("Failed to export the jpg mockup.::actionString = " + actionString.join("\n") + "::e = " + e + "::e.line = " + e.line);
		errorList.push("Failed to export the jpg mockup.");

	}
	

	// doc.exportFile(File(newFileName), jpgExportType, jpgExportOptions)

}