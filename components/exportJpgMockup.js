/*
	Component Name: exportJpgMockup
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

	var newFileName = doc.fullName.toString();
	newFileName = newFileName.replace(/\.ai[t]?/i,"");
	newFileName = newFileName.replace(/^.*users\/[^\/]*/i,homeFolderPath);
	newFileName = newFileName.replace(/(master)|(prepress)/i,"Mockup");
	newFileName += ".jpg";
	

	doc.exportFile(File(newFileName), jpgExportType, jpgExportOptions)

}