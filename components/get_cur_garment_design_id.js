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
	var result;
	var designIdPattern = /[a-z0-9]{12}/i;
	var w = new Window("dialog","Enter the Design ID");
		w.orientation = "column";
		var topTxt = UI.static(w,"Enter the Design ID");
		var input = UI.edit(w,"",15);
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
	return result;

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
			alert("Invalid Design ID");
		}
	}
}