/*
	Component Name: get_cur_garment_design_id
	Author: William Dowling
	Creation Date: 28 August, 2018
	Description: 
		when it has been determined that the design
		id does not exist in the information layer
		for the current garment, prompt the user
		for this information.
	Arguments
		none
	Return value
		string representing design code

*/

function getCurGarmentDesignId()
{
	var result,input;
	var designIdPattern = /[a-z0-9]{12}/i;


	if(devMode)
	{
		return "";
	}
	// else if(autoMode)
	// {

	// 	result = docRef.name;
	// 	var index = result.indexOf("Master_");
	// 	result = result.substring(index+7,result.length);
	// 	result = result.replace(".ai","");
	// 	return result;
	// }
	else
	{
		result = docRef.name.match(designIdPattern);
		if (result && result.length)
		{
			result = result[0];
		}
		else
		{
			result = promptForDesignId();
		}
	}


	
	return result;

	function promptForDesignId()
	{
		var w = new Window("dialog","Enter the Design ID");
			w.orientation = "column";
			var topTxt = UI.static(w,"Enter the Design ID");
				input = UI.edit(w,"",15);
				input.addEventListener("keydown",function(k)
				{
					if(k.keyName === "Enter")
					{
						submit();
					}
				})
			var btnGroup = UI.group(w);
				var cancelBtn = UI.button(btnGroup,"Cancel",cancel);
				var submitBtn = UI.button(btnGroup,"Submit",submit);

		w.show();
	}

	function cancel()
	{
		w.close();
	}
	function submit()
	{
		if(designIdPattern.test(input.text))
		{
			result = input.text;
			w.close();
		}
		else
		{
			alert("Invalid Design ID\nDesign ID must be 12 numbers or letters with no spaces.");
		}
	}
}