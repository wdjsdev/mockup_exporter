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
	if(curGarmentCode.indexOf("W")>-1)
	{
		return "M";
	}
	else if(curGarmentCode.indexOf("Y")>-1)
	{
		return "YXL";
	}
	else
	{
		return "XL";
	}
}