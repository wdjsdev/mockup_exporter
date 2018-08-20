/*
	Component Name: get_garments
	Author: William Dowling
	Creation Date: 16 August, 2018
	Description: 
		loop the layers in the activeDocument and
		extract the converted template garment layers
		and push results to garmentsNeeded array
	Arguments
		none
	Return value
		success boolean

*/

function getGarments()
{
	var result = true;

	for(var x=0,len=layers.length;x<len;x++)
	{
		if(isTemplate(layers[x]))
		{
			garmentsNeeded.push(layers[x]);
		}
	}

	if(!garmentsNeeded.length)
	{
		result = false;
		errorList.push("No converted template garments were found in this master file.");
	}
	return result;
}