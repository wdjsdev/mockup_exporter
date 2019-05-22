function updateWrongPlaceholderColors()
{
	var valid = true;
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	function exec()
	{
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		var pat = /[cb][\d]{1,2}/i;

		var prefixLetter = "C";
		var placeHolderSwatchCount = 0;
		var colorsToReplace = ["Collar B", "Collar_2 B" , "Pocket Welt 1", "Buttons", "Boombah Logo B"];

		function replaceColor(oldColor,newColor)
		{
			docRef.selection = null;
			try
			{
				docRef.defaultFillColor = swatches[oldColor].color;
			}
			catch(e)
			{
				return;
			}
			app.executeMenuCommand("Find Fill Color menu item");
			if(docRef.selection.length)
			{
				var newSwatch = makeNewSpotColor(newColor,"CMYK",BOOMBAH_APPROVED_COLOR_VALUES[newColor],100);
				docRef.defaultFillColor = newSwatch.color;
				docRef.selection = null;
				app.redraw();
			}
			placeHolderSwatchCount++;
		}

		function newPlaceHolderSwatch(num)
		{
			return prefixLetter + (placeHolderSwatchCount + 1);
		}

		function removeLayer(name)
		{
			try
			{
				var rmLayer = layers[0].layers[name];
				rmLayer.locked = false;
				rmLayer.visible = true;
				rmLayer.remove();
			}
			catch(e){};
		}

		removeLayer("USA Collars");

		var ppLay = getPPLay(layers);
		ppLay.visible = true;

		app.doScript("cleanup_swatches","cleanup_swatches");

		for(var x=0,len=swatches.length;x<len;x++)
		{
			if(pat.test(swatches[x].name))
			{
				placeHolderSwatchCount++;
			}
		}
		
		for(var x=0,len=colorsToReplace.length;x<len;x++)
		{
			replaceColor(colorsToReplace[x],newPlaceHolderSwatch(x));
		}


		app.doScript("cleanup_swatches","cleanup_swatches");
		ppLay.visible = false;
		
	}
	// batchInit(exec,"");
	exec();
}
// updateWrongPlaceholderColors();