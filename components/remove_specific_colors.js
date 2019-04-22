/*
	Component Name: remove_specific_colors
	Author: William Dowling
	Creation Date: 25 March, 2018
	Description: 
		loop the given color names array and
		select all objects of each color and delete		
	Arguments
		colorNames
			array of strings representing names of color swatches
	Return value
		void

*/

function removeSpecificColors(colorNames)
{
	var docRef = app.activeDocument;
	for(var x=0,len=colorNames.length;x<len;x++)
	{
		try
		{
			docRef.selection = null;
			docRef.defaultFillColor = swatches[colorNames[x]].color;
			app.executeMenuCommand("Find Fill Color menu item");
			app.redraw();
			app.executeMenuCommand("clear");

			docRef.defaultStrokeColor = swatches[colorNames[x]].color;
			app.executeMenuCommand("Find Stroke Color menu item");
			app.redraw();
			app.executeMenuCommand("clear");
		}
		catch(e){};
	}
}