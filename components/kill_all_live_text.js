function killAllLiveText ()
{
    var doc = app.activeDocument;
    var frames = afc( doc, "textFrames" );
    frames.forEach( function ( f ) { f.createOutline(); } );
}