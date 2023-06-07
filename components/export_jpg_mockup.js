/*
	Component Name: export_jpg_mockup
	Author: William Dowling
	Creation Date: 17 November, 2018
	Description: 
		export the first artboard in the document
		the first artboard SHOULD be the adult mockup..
		unless there is no adult garment in which case
		we do indeed want to export the youth version.
	Arguments
		none
	Return value
		void

*/

function exportJpgMockup ()
{
	var doc = app.activeDocument;
	var ab = doc.artboards;

	var newFileName = decodeURI( doc.fullName.toString() );
	log.l( "newFileName = " + newFileName );
	newFileName = newFileName.replace( /\.ai[t]?/i, "" );
	newFileName = newFileName.replace( /(master)|(prepress)/i, "Mockup" );
	log.l( "converted newFileName to: " + newFileName );

	newFileName = decodeURI( newFileName );

	newFileName = normalizeLocalFilePath( newFileName );

	if ( user == "thell" )
	{
		newFileName = newFileName.replace( "C:", "D:" );
		newFileName = newFileName.replace( /\//g, "\\\\" );
	}
	else if ( os == "windows" )
	{
		log.l( "User is on a PC. converting forward slashes to backslashes" );
		newFileName = decodeURI( newFileName.replace( /\//g, "\\\\" ) );
	}


	newFileName += ".jpg";

	log.l( "finished updating newFileName::newFileName = " + newFileName );


	//global export function located in utilites container
	exportJpg( newFileName, 0 );

	var youthMockupCodes = [ "FD-400G", "FD-3096Y", "FD-5421Y", "FD-5422Y", "FD-5423Y", "FD-5424Y", "FD-5425Y", "FD-5426Y", "FD-5427Y", "FD-5428Y", "FD-5430Y" ]

	var youthMockupLayers = [];

	afc( doc, "layers" ).forEach( function ( l ) 
	{
		if ( youthMockupCodes.indexOf( l.name.replace( /_.*/i, "" ) ) >= 0 )
		{
			youthMockupLayers.push( l );
		}
	} );
	if ( youthMockupLayers.length )
	{
		exportJpg( newFileName.replace( ".jpg", "_Youth.jpg" ), 1 );
	}

}