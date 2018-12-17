/*
	Component Name: fix_svg_coding
	Author: William Dowling
	Creation Date: 07 September, 2018
	Description: 
		remove specific instances of "_1_" from the svg code
		except when they are preceded by "SVGID"
	Arguments
		exportFile
			file object where the svg was saved
	Return value
		void

*/

function fixSvgCoding(exportFile)
{
	var contents,matchedText;

	var svgidRegex = /([SVGID]{5})(_\d*_)/g;
	var underscoreRegex = /_\d*_\"/g;

	exportFile.open();
	contents = exportFile.read();
	exportFile.close();

	var docTypeDeclaration = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
	var svgInfoDeclaration = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="4000px" height="4000px" viewBox="0 0 4000 4000" enable-background="new 0 0 4000 4000" xml:space="preserve">';

	


	var svgFileLines = contents.split("\n");

	for(var x = svgFileLines.length-1;x>=0;x--)
	{
		if(svgFileLines[x].indexOf("svg version")>-1)
		{
			svgFileLines[x] = docTypeDeclaration + svgInfoDeclaration;
			svgFileLines.splice(x+1,1);
		}
		else if(svgFileLines[x].indexOf("</g>")>-1 && svgFileLines[x+1] === "</svg>")
		{
			svgFileLines[x] = "</g>\n<defs></defs>\n</svg>";
			svgFileLines.splice(x+1,1);
		}
		else if(svgFileLines[x].indexOf("SVGID")>-1)
		{
			svgFileLines[x] = svgFileLines[x].replace(svgidRegex,svgFileLines[x].match(svgidRegex)[0] + "Xrm_meX");
		}

	}

	contents = svgFileLines.join("\n");



	
	// matchedText = contents.match(svgidRegex);

	// if(matchedText)
	// {
	// 	contents = contents.replace(svgidRegex,matchedText[0] + "Xrm_meX");	
	// }

	contents = contents.replace(underscoreRegex,"\"");
	contents = contents.replace(/Xrm_meX/g,"");


	// exportFile = File("/Volumes/Macintosh HD/Users/will.dowling/Desktop/temp/test_svgs/saved_through_script.svg")
	exportFile.open("w");
	exportFile.write(contents);
	exportFile.close();
}
// fixSvgCoding(File("/Volumes/Macintosh HD/Users/will.dowling/Desktop/temp/test_svgs/saved_through_ui.svg"))