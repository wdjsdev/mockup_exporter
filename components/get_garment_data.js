/*
	Component Name: get_garment_data
	Author: William Dowling
	Creation Date: 14 May, 2019
	Description: 
		prompt the user to determine non-artwork display
		colors such as buttons and drawstrings. The user will
		give a name for the item which will be used to create
		a rectangle that can be filled with the appropriate color
		later. Additionally the user will indicate the relative
		sequence number to determine which color will be used.
		Sequence number will be relative to the end of the list
		of placeholder colors. For example if there are 6 placeholder
		colors and the buttons on a given garment use the 6th color,
		the sequence will be 0. if we need the second to last color,
		sequence will be 1. These values need to be calculated backwards
		because differen styles will have different numbers of placeholder
		colors.
	Arguments
		none
	Return value
		void

*/

function getGarmentData()
{
	var nonArtworkDisplayBlocks = [];
	var inputGroups = [];
	var flipCollars = true;
	var garCodeInput;

	function makeInputGroup(parent)
	{
		var newGroup = UI.group(parent);
			newGroup.orientation = "column";

			var nameGroup = newGroup.nameGroup = UI.group(newGroup);
				nameGroup.orientation = "row";
				var nameMsg = UI.static(nameGroup,"Name: ");
				var nameInput = nameGroup.input = UI.edit(nameGroup,"_Name_",15);

			var seqGroup = newGroup.seqGroup = UI.group(newGroup);
				seqGroup.orientation = "row";
				var seqMsg = UI.static(seqGroup,"Swatch Sequence #: ");
				var seqInput = seqGroup.input = UI.edit(seqGroup,"_Sequence_",10);

			var hDivider = UI.hseparator(newGroup,200);

		inputGroups.push(newGroup);
		return newGroup;
	}

	function displayHelpDialog()
	{
		var hd = new Window("dialog");
			var nameHelp = UI.static(hd,"In The \"Name:\" field:")
			var nameHelp2 = UI.static(hd,"Enter the name of the rectangle that you");
			var nameHelp3 = UI.static(hd,"created on the \"Artwork Layer\"");
			
			var sep = UI.hseparator(hd,300);

			var seqHelp = UI.static(hd,"In the \"Swatch Sequence #\" field:");
			var seqHelp2 = UI.static(hd,"Enter an integer.");
			var seqHelp3 = UI.static(hd,"It should be the number to subtract from");
			var seqHelp4 = UI.static(hd,"the total number of placeholder swatches");
			var seqHelp5 = UI.static(hd,"to reach the desired swatch. For example");
			var seqHelp6 = UI.static(hd,"if the buttons get the last swatch in the list");
			var seqHelp7 = UI.static(hd,"enter 0. If you need the second to last swatch enter 1.");
			var seqHelp8 = UI.static(hd,"See William if you are still unsure.");

			var btnGroup = UI.group(hd);
				var ok = UI.button(btnGroup,"Ok",function()
				{
					hd.close();
				})
		hd.show();
	}

	function validate()
	{
		var result = [];

		var curInput,curName,curSeq;
		for(var x=0,len=inputGroups.length;x<len;x++)
		{
			curInput = inputGroups[x];
			curName = curInput.nameGroup.input.text;
			curSeq = curInput.seqGroup.input.text;
			if(curName.indexOf("_") === -1 && curSeq.indexOf("_") === -1)
			{
				result.push({name: curName, seq : parseInt(curSeq)});
				if(curName.indexOf("utton")>-1)
				{
					flipCollars = false;
				}
			}
		}


		//validate the garment code
		var garCodePat = /[fp][ds][-_]\d{3,4}[a-z]?/i;
		if(!garCodePat.test(garCodeInput.text))
		{
			alert("Invalid Garment Code. Please try again");
			return false;
		}

		nonArtworkDisplayBlocks = result;
		curGarmentCode = garCodeInput.text.replace("_","-").toUpperCase();
		return true;
	}

	function getDisplayUpdateInfo()
	{
		var w = new Window("dialog","");
			var gcGroup = UI.group(w);
				var gcTxt = UI.static(gcGroup,"Enter the Garment Code");
				garCodeInput = UI.edit(gcGroup,"FD-123");
				garCodeInput.characters = 10;
			var topTxt = UI.static(w,"Define the non-artwork display colors");
			var topTxt2 = UI.static(w,"Enter the name of the display rectangle.");
			var topTxt3 = UI.static(w,"Then select the appropriate relative sequence number.");
			
			var inputGroup = UI.group(w);
				inputGroup.orientation = "column";
				makeInputGroup(inputGroup);
				makeInputGroup(inputGroup);
				makeInputGroup(inputGroup);

			var btnGroup = UI.group(w);
				var help = UI.button(btnGroup,"Help",function()
				{
					displayHelpDialog();
				})
				var cancel = UI.button(btnGroup,"Cancel",function()
				{
					valid = false;
					w.close();
				})
				var submit = UI.button(btnGroup,"Submit",function()
				{
					if(validate())
					{
						w.close();
					}
				})
		w.show();

	}

	getDisplayUpdateInfo();

	writeMockupExporterGarmentData(nonArtworkDisplayBlocks,flipCollars);
	createDisplayBoxes(nonArtworkDisplayBlocks);

	
}