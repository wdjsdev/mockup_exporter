/*
	Component Name: write_mockup_exporter_garment_data
	Author: William Dowling
	Creation Date: 14 May, 2019
	Description: 
		open the mockup exporter garment data file,
		parse it's contents, add the given data
		and then write the data back to the file.
	Arguments
		nonArtworkDisplayBlocks
			array of objects including name of block and sequence number
				[{"name":"buttons","seq":0},{"name":"drawstring","seq":1}]
		flipCollars
			boolean representing whether to flip the collars
	Return value
		void

*/

function writeMockupExporterGarmentData(nonArtworkDisplayBlocks,flipCollars)
{
	var dataFile = File(dataPath + "/mockup_exporter_garment_data.js");

	var parenPat = /[\(\)]/g;
	
	//include the dataFile 
	eval("#include \"" + dataFile.fsName + "\"");

	if(mockupExporterGarmentData[curGarmentCode] && !confirmProceed())
	{
		log.l("User opted not to overwrite the data.");
		return;
	}

	mockupExporterGarmentData[curGarmentCode] = {"flipCollars":flipCollars,updateDisplay:nonArtworkDisplayBlocks};

	var writeStr = "var mockupExporterGarmentData = ";
	writeStr += JSON.stringify(mockupExporterGarmentData).replace(parenPat,"");
	
	dataFile.open("w");
	dataFile.write(writeStr);
	dataFile.close();



	function confirmProceed()
	{
		var result = false;
		var w = new Window("dialog");
			var msg = UI.static(w,"A database entry already exists for:")
			var msg2 = UI.static(w,curGarmentCode);
			var msg3 = UI.static(w,"Do you want to overwrite?");
			var btnGroup = UI.group(w);
				var no = UI.button(btnGroup,"No",function()
					{
						result = false;
						w.close();
					});
				var yes = UI.button(btnGroup,"Yes",function()
					{
						result = true;
						w.close();
					});
		w.show();
		return result;
	}

}