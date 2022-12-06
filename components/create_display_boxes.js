/*
	Component Name: create_display_boxes
	Author: William Dowling
	Creation Date: 15 May, 2019
	Description: 
		create named rectangles at bottom right
		corner of artboard to be used for non-artwork
		display colors later (buttons,drawstrings,etc)
	Arguments
		displays
			array of non artwork display objects
	Return value
		void

*/

function createDisplayBoxes ( displays )
{
	if ( !displays || !displays.length ) return;
	var boxDimension = 150;
	var abRect = aB[0].artboardRect;
	var yPos = abRect[3]-abRect[1] + boxDimension;
	// var artLay = layers["Art"];
	var artLay = findSpecificLayer(layers,"Art","imatch");
	if(!artLay)
	{
		artLay = layers.add();
		artLay.name = "Art";
	}


	var newBlock;
	for ( var x = 0, len = displays.length; x < len; x++ )
	{
		//
		//attn
		//
		//this try/catch should be replaced
		// try
		// {
		// 	newBlock = artLay.pageItems[displays[x].name];
		// }
		// catch(e)
		// {
		// 	newBlock = artLay.pathItems.rectangle(yPos,0,boxDimension,boxDimension);
		// 	newBlock.name = displays[x].name;
		// 	newBlock.filled = false;
		// 	newBlock.stroked = false;
		// 	yPos += boxDimension;
		// 	docRef.selection = null;
		// }

		newBlock = findSpecificPageItem(artLay,displays[x].name,"imatch");
		if(!newBlock)
		{
			newBlock = artLay.pathItems.rectangle( yPos, 0, boxDimension, boxDimension );
			newBlock.name = displays[ x ].name;
			newBlock.filled = false;
			newBlock.stroked = false;
			yPos += boxDimension;
			docRef.selection = null;
		}

	}
}