function test()
{
	var valid = true;
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.jsxbin\"");
	eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Batch_Framework.jsxbin\"");
	
	var colorRelationships = 
	[
		{
			oldColor:"Buttons",
			newColor: function()
			{
				getColor(1);
			}
		},
		{
			oldColor:"Boombah Logo B",
			newColor:function()
			{
				getColor(2);
			}
		}
	];

	function getColor(num)
	{
		var newColor = 
	}

	function exec()
	{
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		var obj = {};
		var arr = [];

		var ppLay = getPPLay(layers);
		ppLay.visible = true;

		docRef.selection = null;

		for(var x=0,len=colorRelationships.length;x<len;x++)
		{
			try
			{
				docRef.defaultFillColor = swatches[colorRelationships[x].oldColor].color;
				app.executeMenuCommand("Find Fill Color menu item");
				docRef.defaultFillColor = swatches[colorRelationships[x].newColor].color;
			}
			catch(e)
			{
				errorList.push('failed to change the color on the file: ' + docRef.name);
			}
		}
		
		docRef.selection = null;
		ppLay.visible = false;
	}

	batchInit(exec,"updating facing color");

	if(errorList.length)
	{
		sendErrors();
	}


	
}
test();