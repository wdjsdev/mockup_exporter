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
	var garmentLayers = [];
	var selectedGarments = [];

	for(var x=0,len=layers.length;x<len;x++)
	{
		if(isTemplate(layers[x]))
		{
			garmentLayers.push(layers[x]);
		}
	}

	if(!garmentLayers.length)
	{
		result = false;
		errorList.push("No converted template garments were found in this master file.");
	}
	else if(garmentLayers.length === 1)
	{
		garmentsNeeded = [garmentLayers[0]];
	}
	else
	{	
		selectGarmentsToExport();
		garmentsNeeded = selectedGarments;
	}

	return result;


	function selectGarmentsToExport()
	{
		var w = new Window("dialog");
			var topTxt = UI.static(w,"Select the garments you want to export.");
			var inputGroup = UI.group(w);
				inputGroup.orientation = "column";
				inputGroup.garments = [];
				var newGroup,checkBox;
				for(var x=0,len=garmentLayers.length;x<len;x++)
				{
					newGroup = UI.group(inputGroup);
					newGroup.name = garmentLayers[x].name;
					newGroup.checkbox = UI.checkbox(newGroup,garmentLayers[x].name);
					inputGroup.garments.push(newGroup);
				}
			var btnGroup = UI.group(w);
				var ok = UI.button(btnGroup,"Ok",function()
				{
					for(var x=0,len=inputGroup.garments.length;x<len;x++)
					{
						if(inputGroup.garments[x].checkbox.value)
						{
							selectedGarments.push(layers[inputGroup.garments[x].name]);
						}
					}
					w.close();
				})
		w.show();
	}
}