function killAllLiveText ()
{
    var doc = app.activeDocument;
    var frames = afc( doc, "textFrames" );
    frames.forEach( function ( f ) 
    {
        if ( f.layer.name.match( /art/i ) )
        {
            f.createOutline();
        }
    } );
}