function getSecondToLastCColorSwatch()
{
	var doc = app.activeDocument;
	var swatches = doc.swatches;
	var arr = [];
	var cSwatchRegEx = /^C[\d]{1,2}$/;

	var curSwatch;
	for(var x=0,len=swatches.length;x<len;x++)
	{
		curSwatch = swatches[x];
		if(cSwatchRegEx.test(curSwatch.name))
		{
			arr.push(curSwatch);
		}
	}
	arr = arr.sort();

	if(arr.length)
		return arr[arr.length-2].name;
	else
		return undefined;
}
