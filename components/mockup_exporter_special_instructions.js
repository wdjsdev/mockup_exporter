////////////////////////
////////ATTENTION://////
//
//		This component is deprecated in favor of
//		a more centralized database accessible
//		by other users.
//
////////////////////////

/*
	Component Name: mockup_exporter_special_instructions
	Author: William Dowling
	Creation Date: 23 August, 2018
	Description: 
		object holding the special functions that must 
		be executed for a given garment code when
		executing the Mockup_Exporter.jsx script.

*/

var mockupExporterSpecialInstructions = 
{
	
	"FD-161": function()
	{
		return this.flipCollars();
	},

	"FD-163": function()
	{
		return this.flipCollars();
	},

	"FD-161W": function()
	{
		return this.flipCollars();
	},

	"FD-163W": function()
	{
		return this.flipCollars();
	},

	"FD-161G": function()
	{
		return this.flipCollars();
	},

	"FD-163G": function()
	{
		return this.flipCollars();
	},

	"FD-170W": function()
	{
		return this.flipCollars();
	},

	"FD-170G": function()
	{
		return this.flipCollars();
	},

	"FD-230": function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-233": function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 1);
	},

	"FD-234" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-240W" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-240G" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-243W" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 1);
	},

	"FD-243G" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 1);
	},

	"FD-246W" : function()
	{
		return this.updateDisplay("buttons", uvParamLayer.pageItems.length - 2);
	},

	"FD-246G" : function()
	{
		return this.updateDisplay("buttons", uvParamLayer.pageItems.length - 2);
	},

	"FD-3132" : function()
	{
		return this.flipCollars();
	},

	"FD-3132W" : function()
	{
		return this.flipCollars();
	},

	"FD-400W" : function()
	{
		return this.flipCollars();
	},

	"FD-400G" : function()
	{
		return this.flipCollars();
	},

	"FD-4416W" : function()
	{
		return this.flipCollars();
	},

	"FD-4416G" : function()
	{
		return this.flipCollars();
	},

	"FD-500W" : function()
	{
		return this.flipCollars();
	},

	"FD-5060" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length-1);
	},

	"FD-5060W" : function()
	{
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-5077" : function()
	{
		return this.updateDisplay("buttons", uvParamLayer.pageItems.length - 2);
	},

	"FD-600" : function()
	{
		return this.flipCollars();
	},

	"FD-609W" : function()
	{
		return this.flipCollars();
	},

	"FD-692": function()
	{
		return this.updateDisplay("drawstrings",uvParamLayer.pageItems.length - 2);
	},

	"PS-5098W": function()
	{
		this.updateDisplay("base_color",0);
		this.updateDisplay("boombah_logo",uvParamLayer.pageItems.length - 1);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},




	//generic functions

	"flipCollars":function()
	{
		var artCollar = uvFile.layers["Art"].pageItems["Collar"];
		artCollar.rotate(180);
		return true;
	},

	"updateDisplay" : function(names,seq)
	{
		try
		{
			var dsParam = uvParamLayer.pageItems[seq];
			var dsParamColor = dsParam.fillColor.spot.name;
			var dsSwatch = swatches[dsParamColor];
		}
		catch(e)
		{
			errorList.push("Failed to set the color for the" + name + " display.");
			return false;
		}

		docRef.selection = null;

		var curItem;
		for(var x=0,len = uvArtLayer.pageItems.length; x<len ;x++)
		{
			curItem = uvArtLayer.pageItems[x];
			if(names.indexOf(curItem.name)>-1)
			{
				curItem.selected = true;
			}
		}
		app.activeDocument.defaultFillColor = dsSwatch.color;
		app.activeDocument.selection = null;
		app.redraw();
		return true;
	}
}