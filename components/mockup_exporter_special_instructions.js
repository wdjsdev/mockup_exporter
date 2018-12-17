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
		this.flipCollars();
		return this.alignBottomsOfCollars();
	},

	"FD-163": function()
	{
		this.flipCollars();
		return this.alignBottomsOfCollars();
	},

	"FD-170W": function()
	{
		return this.flipCollars();
	},

	"FD-230": function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-233": function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-234" : function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-240W" : function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},

	"FD-243W" : function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 1);
	},

	"FD-246W" : function()
	{
		var rmNames = ["Placard","Placket"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons", uvParamLayer.pageItems.length -1);
	},

	"FD-500W" : function()
	{
		return this.flipCollars();
	},

	"FD-600" : function()
	{
		return this.flipCollars();
	},

	"FD-609W" : function()
	{
		return this.flipCollars();
	},

	"FD-872": function()
	{
		return this.updateDisplay("drawstrings",uvParamLayer.pageItems.length - 2);
	},

	"FD-4416W" : function()
	{
		return this.flipCollars();
	},

	"FD-5060" : function()
	{
		var rmNames = ["Right Fly Facing", "Right Knee", "Left Knee"];
		this.removeSpecificPieces(rmNames);
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length-1);
	},

	"FD-5060W" : function()
	{
		var rmNames = ["Knee Panel 1", "Knee Panel 2", "Small Belt Loops 1", "Small Belt Loops 2", "Pocket Welt 1", "Pocket Welt 2", "Crotch Facing", "Right Fly Facing", "Left Fly Facing"];
		this.removeSpecificPieces(rmNames);
		this.updateDisplay("small_belt_loop", (Math.abs(uvParamLayer.pageItems.length - 5)));
		return this.updateDisplay("buttons",uvParamLayer.pageItems.length - 2);
	},




	//"global" settings and variables

	"docProps" : {},

	populateDocProps: function()
	{
		this.docProps.doc = app.activeDocument;
		this.docProps.layers = this.docProps.doc.layers;
		this.docProps.artLay = findSpecificLayer(this.docProps.doc,"Art");
		this.docProps.guidesLay = findSpecificLayer(this.docProps.doc,"Guides");
		this.docProps.collarBleed = 20.5;

		if(!this.docProps.artLay || !this.docProps.guidesLay)
		{
			errorList.push("Failed to identify one or more necessary layers:");
			errorList.push("artLay = " + this.docProps.artLay + "\nguidesLay = " + this.docProps.guidesLay);
			return false;
		}
		return true;
	},




	//generic functions

	"flipCollars":function()
	{
		var artCollar = this.docProps.artLay.pageItems["Collar"];
		artCollar.rotate(180);
		return true;
	},

	"alignBottomsOfCollars":function()
	{
		// var doc = app.activeDocument;
		// var layers = doc.layers;
		// var artLay = findSpecificLayer(doc,"Art");
		// var guidesLay = findSpecificLayer(doc,"Guides");
		// var collarBleed = 20.5;

		// if(!artLay || !guidesLay)
		// {
		// 	errorList.push("Failed to identify one or more necessary layers:");
		// 	errorList.push("artLay = " + artLay + "\nguidesLay = " + guidesLay);
		// 	return false;
		// }

		var guideCollar = this.docProps.guidesLay.pageItems["Collar"];
		var artCollar = this.docProps.artLay.pageItems["Collar"];
		artCollar.height = guideCollar.height + collarBleed*2;
		artCollar.top = (guideCollar.top + artCollar.height - guideCollar.height) - collarBleed;
		return true;
	},

	"removeSpecificPieces":function(names)
	{
		for(var x= uvArtLayer.pageItems.length-1;x>=0;x--)
		{
			for(var y=0,yLen = names.length;y<yLen;y++)
			{
				if(uvArtLayer.pageItems[x].name.toLowerCase().indexOf(names[y].toLowerCase()) > -1)
				{
					uvArtLayer.pageItems[x].remove();
				}
			}
		}
	},

	// "updateDisplay" : function(names,seq)
	// {
	// 	var name;
	// 	for(var x=0,len = names.length;x<len;x++)
	// 	{
	// 		//"name" = array of names of display boxes in the uv map file that need to be recolored
	// 		//"seq" = an integer representing which swatch to apply.
	// 			//eg. if seq = 2, use the swatch that is used for the uvParamLayer.pageItems[2].
	// 		name = names[x];
	// 		try
	// 		{
	// 			var disp = uvArtLayer.pageItems[name];
	// 		}
	// 		catch(e)
	// 		{
	// 			errorList.push("Failed to find the " + name + " display in the UV Map File.");
	// 			return false;
	// 		}


	// 		try
	// 		{
	// 			var dsParam = uvParamLayer.pageItems[seq];
	// 			var dsParamColor = dsParam.fillColor.spot.name;
	// 			var dsSwatch = swatches[dsParamColor];
	// 		}
	// 		catch(e)
	// 		{
	// 			errorList.push("Failed to set the color for the" + name + " display.");
	// 			return false;
	// 		}

	// 		app.activeDocument.selection = null;


	// 		disp.selected = true;

	// 		app.activeDocument.defaultFillColor = dsParam.fillColor;
	// 	}
	// 	return true;
	// }

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