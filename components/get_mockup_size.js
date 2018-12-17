/*
	Component Name: get_mockup_size
	Author: William Dowling
	Creation Date: 16 August, 2018
	Description: 
		parse the garment code to figure out
		what the correct mockup size is
	Arguments
		none
	Return value
		string representing mockup size

*/

function getMockupSize()
{
	var mockupSize;
	var curData;

	eval("#include \"" + centralLibraryFile.fsName + "\"");
	if(prepressInfo)
	{
		curData = prepressInfo[curGarmentCode];
		
		if(curData)
		{
			mockupSize = curData.mockupSize;
			if(mockupSize.toLowerCase().indexOf("i")>-1)
			{
				sizeType = "var";
			}
		}


	}
	return mockupSize;

}