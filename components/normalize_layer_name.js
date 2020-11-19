/*
	Component Name: normalize_layer_name
	Author: William Dowling
	Creation Date: 11 April, 2019
	Description: 
		update the top level layer name to match the file
		name
	Arguments
		none
	Return value
		void

*/

function normalizeLayerName()
{
	if(docRef.name.indexOf("ntitled") === -1 && !(/^[\d]{7}/.test(docRef.name)))
	{
		layers[0].name = docRef.name.replace(".ai","").replace("_0","_10").replace("FD_","FD-").replace("PS_","PS-");
	}
}