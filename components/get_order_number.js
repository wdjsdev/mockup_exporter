/*
	Component Name: get_order_number
	Author: William Dowling
	Creation Date: 17 July, 2019
	Description: 
		parse the file name to find the order number
	Arguments
		master
			file object
	Return value
		void

*/

function getOrderNumber(master)
{
	var result,tmpStr;
	if(!master.name || master.name.indexOf("Untitled")>-1)
	{
		log.e("Master file is unsaved. Aborting.");
		errorList.push("You must save the master file before exporting the mockup.");
		valid = false;
		return result;
	}
	
	tmpStr = master.name.replace(/[-_]/,"_BR_")
	result = master.name.substring(0,tmpStr.indexOf("_BR_"));
	if(/[\d]{7}/.test(result))
	{
		return result;
	}
	else
	{
		return promptForOrderNumber();
	}

	function promptForOrderNumber()
	{
		var userInput
		var w = new Window("dialog");
			var txt = UI.static(w,"Enter the order number.");
			var input = UI.edit(w,"1234567",10);
			var btnGroup = UI.group(w);
				var cancel = UI.button(btnGroup,"Cancel",function()
				{
					w.close();
					userInput = undefined;
				});
				var submit = UI.button(btnGroup,"Submit",function()
				{
					if(validate())
					{
						userInput = input.text;
						w.close();
					}
				});
		w.show();

		return userInput;


		function validate()
		{
			return /^\d{7}$/.test(input.text);
		}
	}
}