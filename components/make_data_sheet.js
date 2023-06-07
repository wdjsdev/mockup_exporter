
function makeDataSheet ()
{

    if ( app.documents.length )
    {
        var doc = app.activeDocument;
        var docsArray = afc( app, "documents" );
        var layers = doc.layers;
        var layArray = afc( doc, "layers" );
        var swatches = doc.swatches;
        var swatchArray = afc( doc, "swatches" );
        var aB = doc.artboards;
        var aBArray = afc( doc, "artboards" );
        var sel, selArray;
        if ( doc.selection.length )
        {
            sel = doc.selection;
            selArray = afc( doc, "selection" );
        }
    }

    var infoSwatch = makeNewSpotColor( "Info B" );





    function analyzeParamBlock ( block )
    {
        if ( block.typename.match( /group/i ) && !block.groupItems.length )
        {
            return;
        }
        app.activeDocument.selection = null;
        var label = block.name.replace( /paramcolor-/i, "" );

        var tmpBlock = block.duplicate( tmpLay );
        tmpBlock.selected = true;
        app.executeMenuCommand( "expandStyle" );
        app.activeDocument.selection = null;
        ungroup( tmpLay, tmpLay, 0 );
        var result = { "label": label, "base": [], "gradients": [], "patterns": [] };
        afc( tmpLay, "pageItems" ).forEach( function ( item )
        {
            if ( !item ) { return; }
            var itemResult = getItemColors( item );
            if ( !itemResult ) { return; }
            [ "base", "gradients", "patterns" ].forEach( function ( prop )
            {
                itemResult[ prop ].forEach( function ( color )
                {
                    result[ prop ].push( color );
                } )
            } )

        } );

        afc( tmpLay, "pageItems" ).forEach( function ( item )
        {
            item.remove();
        } );

        return result
    }

    function getItemColors ( item )
    {
        var testItem = item;
        if ( item.typename.match( /compound/i ) )
        {
            if ( !item.pathItems.length )
            {
                item = cleanupCompoundPath( item );
            }
            testItem = item.pathItems[ 0 ];
        }

        if ( item.guides || ( !testItem.filled && !testItem.stroked ) )
        {
            item.remove();
            return;
        }



        var wrongColor = false;
        var curItemColors = [];
        var curItemPatterns = [];
        var curItemGradients = [];
        var prodColors = BOOMBAH_PRODUCTION_COLORS.map( function ( color ) { return color.toLowerCase() } );

        [ "fill", "stroke" ].forEach( function ( prop )
        {
            var curProp = testItem[ prop + "Color" ];

            if ( !testItem[ prop.replace( /e$?/i, "" ) + "ed" ] )
            {
                return;
            }

            if ( curProp.typename.match( /gradient/i ) )
            {
                afc( curProp.gradient, "gradientStops" ).forEach( function ( stop )
                {
                    curItemGradients.push( stop.color.spot.name );
                } );
            }
            else if ( curProp.typename.match( /pattern/i ) )
            {
                curItemPatterns.push( curProp.pattern.name + "_" + processPatternFill( curProp.pattern.name ).join( "/" ) );
            }
            else
            {
                curItemColors.push( curProp.spot.name );
            }
        } );

        //strip out production colors
        curItemColors = curItemColors.filter( function ( color )
        {
            return prodColors.indexOf( color.toLowerCase() ) === -1;
        } )

        return { base: getUnique( curItemColors ), gradients: getUnique( curItemGradients ), patterns: getUnique( curItemPatterns ) };
    }

    function processPatternFill ( patternName )
    {
        var patternColors = [];
        log.h( "Processing pattern Fill: " + patternName );
        var tmpPatternLay = doc.layers.add();
        doc.selection = null;

        var rect = tmpPatternLay.pathItems.rectangle( 0, 0, 1, 1 );
        // rect.fillColor = swatches[ pswatch ].color;
        rect.fillColor = doc.swatches[ patternName ].color;
        rect.strokeColor = new NoColor();
        rect.selected = true;


        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

        app.executeMenuCommand( "expandStyle" );
        app.executeMenuCommand( "Expand3" );

        app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;

        ungroup( tmpPatternLay, tmpPatternLay, 0 );
        // afc( tmpPatternLay, "groupItems" ).forEach( function ( g )
        // {
        //     //as far as i know, expanding a pattern fill will always result in a clip group
        //     //which consists of a rectangle as a clipping mask and an "art group" of the items
        //     //that comprise the pattern fill.
        //     //so ungroup that "art group" to the tmpPatternGroup for color checking
        //     if ( !g.groupItems[ 0 ].groupItems.length )
        //     {
        //         return;
        //     }
        //     ungroup( g.groupItems[ 0 ].groupItems[ 0 ], tmpPatternLay, 0 );
        // } )

        // app.redraw();


        //in theory... this layer should only contain the plain and simple artwork that comprises
        //each of the pattern fills that are used. so we can just check the colors of the items in this layer
        afc( tmpPatternLay, "pathItems" ).forEach( function ( p )
        {
            var path;
            if ( p.typename.match( /compound/i ) )
            {
                if ( !p.pathItems.length )
                {
                    p = cleanupCompoundPath( p );
                }
                if ( !p )
                {
                    p.remove();
                    return;
                }
                path = p.pathItems[ 0 ] || p;
            }
            else if ( p.typename.match( /pathItem/i ) )
            {
                path = p;
            }
            var itemColors = getItemColors( path );
            if ( !itemColors )
            {
                return;
            }
            patternColors.push( itemColors.base[ 0 ] );
        } );

        tmpPatternLay.remove();

        return getUnique( patternColors );

    }

    function makePlaceholderLabel ( data, labelContainer, w, h )
    {
        var doc = app.activeDocument;

        var pTextSize = h * .15; //placeholder name text, ie "C1"
        var iLabelTextSize = h * .1; //info label text, ie "Gradient:"
        var iTextSize = h * .07; //info text, ie "Red B"


        var phLabelGroup = labelContainer.groupItems.add();
        doc.selection = null;

        doc.defaultFillColor = infoSwatch.color;

        var bgRect = phLabelGroup.pathItems.roundedRectangle( 0, 0, w, h, 15, 15 );
        bgRect.fillColor.tint = 0;
        bgRect.strokeColor = infoSwatch.color;
        bgRect.strokeColor.tint = 100;

        var bgBounds = getBoundsData( bgRect );

        var phText = phLabelGroup.textFrames.add();
        phText.contents = data.label;
        phText.textRange.characterAttributes.size = pTextSize;
        phText.textRange.characterAttributes.fillColor.tint = 100;
        phText.left = bgBounds.left + bgBounds.width * .05;
        align( bgRect, [ phText ], "vcenter" );

        var infoGroup = phLabelGroup.groupItems.add();

        [ "base", "gradients", "patterns" ].forEach( function ( prop, ind, thisArr )
        {
            var labelFrame = infoGroup.textFrames.add();
            labelFrame.contents = prop.toTitleCase();
            labelFrame.textRange.characterAttributes.size = iLabelTextSize;
            var posL = bgBounds.left + bgBounds.width * .15;
            var posT = bgBounds.t - ( ( bgBounds.halfHeight / 2 ) * ( ind + 1 ) ) + ( iLabelTextSize );
            labelFrame.position = [ posL, posT ];

            var infoFrame = infoGroup.textFrames.add();
            infoFrame.contents = data[ prop ].join( ", " );
            infoFrame.textRange.characterAttributes.size = iTextSize;
            infoFrame.position = [ posL, posT - ( iTextSize * 1.5 ) ];
        } );

        var dbDim = bgBounds.height * .7;
        var strokeBlock = infoGroup.pathItems.rectangle( bgBounds.t, bgBounds.l, dbDim, dbDim );
        var displayBlock = infoGroup.pathItems.rectangle( bgBounds.t, bgBounds.l, dbDim, dbDim );
        strokeBlock.name = "strokeBlock";
        strokeBlock.filled = false;
        strokeBlock.strokeColor = infoSwatch.color;
        strokeBlock.strokeWeight = 1;
        strokeBlock.left = displayBlock.left = ( bgBounds.left + bgBounds.width * .9 ) - dbDim;

        align( bgRect, [ displayBlock, strokeBlock ], "vcenter" )


        var gS = afc( doc, "graphicStyles" ).filter( function ( gs ) { return gs.name === data.label } );

        if ( gS.length )
        {
            gS = gS[ 0 ];
            gS.applyTo( displayBlock );
        }
        else 
        {
            errorList.push( "Could not find graphic style: " + data.label );
        }

        return phLabelGroup;
    }




    //extract the garment code from the layer names
    //locate the param colors group on the mockup layer of the first garment in the file
    //extract the appearance of each param block and build a string to describe the colors/gradients/patterns
    //then print the info in a new ai file

    var garmentCode, orderNumber, designNumber, appearanceString = "";
    var artItems = [];

    var garmentLayers = layArray.filter( function ( lay )
    {
        return lay.name.match( /[a-z]{2,3}-\d{3,}/i )
    } );

    if ( !garmentLayers.length )
    {
        alert( "No garment layers found in this file" );
        return;
    }
    garmentCode = garmentLayers[ 0 ].name + ( garmentLayers.length > 1 ? "_" + garmentLayers[ 1 ].name : "" );

    var docName = app.activeDocument.name;
    designNumber = docName.match( /[a-z\d]{12}/i );
    designNumber = designNumber ? designNumber[ 0 ] : "no_design_number";

    orderNumber = docName.match( /\d{7}/ );
    orderNumber = orderNumber ? orderNumber[ 0 ] : "no_order_number";

    var artworkLayer = findSpecificLayer( garmentLayers[ 0 ], "Artwork" );
    if ( artworkLayer )
    {
        afc( artworkLayer, "groupItems" ).forEach( function ( group )
        {
            artItems.push( group.name );
        } );
        afc( artworkLayer, "layers" ).forEach( function ( layer )
        {
            afc( layer, "groupItems" ).forEach( function ( group )
            {
                artItems.push( group.name );
            } );
        } );

        artItems = getUnique( artItems );
    }

    //get the param colors
    var mockupLayer = findSpecificLayer( garmentLayers[ 0 ], "Mockup" );
    if ( mockupLayer )
    {
        var paramLay = findSpecificLayer( mockupLayer, "paramcolors" );
        if ( !paramLay )
        {
            errorList.push( "Could not find paramcolors layer" );
            return;
        }
        paramBlocks = afc( paramLay, "pathItems" ).sort( function ( a, b )
        {
            return a.name.charAt( a.name.length - 1 ) - b.name.charAt( b.name.length - 1 )
        } );
    }

    if ( !paramBlocks.length )
    {
        return;
    }


    var paramData = [];
    var tmpLay = layers.add();
    paramBlocks.forEach( function ( block )
    {
        paramData.push( analyzeParamBlock( block ) );
    } );
    tmpLay.remove();






    var ab = doc.artboards[ 0 ];
    var abb = getBoundsData( ab );


    var curX = 20;
    var curY = -50;
    var padding = 20;
    var labelHeight = ( abb.h - padding * 2 - padding ) / 5;
    var labelWidth = labelHeight * 2.25;

    //remove existing color info layer if necessary
    var existingInfoLayer = findSpecificLayer( doc, "Color Info" );
    if ( existingInfoLayer )
    {
        existingInfoLayer.locked = false;
        existingInfoLayer.visible = true;
        existingInfoLayer.remove();
    }


    var ogLayers = afc( doc, "layers" );
    ogLayers.forEach( function ( lay )
    {
        lay.visible = false;
    } )

    var labelLayer = doc.layers.add();
    labelLayer.name = "Color Info";
    labelLayer.zOrder( ZOrderMethod.SENDTOBACK );
    var labelContainer = labelLayer.groupItems.add();

    paramData.forEach( function ( paramInfo, ind )
    {
        var labelGroup = makePlaceholderLabel( paramInfo, labelContainer, labelWidth, labelHeight );
        labelGroup.position = [ curX, curY ];
        if ( ind && ind % 4 === 0 )
        {
            curX += labelWidth;
            curY = -50;
        }
        else 
        {
            curY -= labelHeight;
        }

    } )

    var newScale;
    if ( labelContainer.width > abb.w - padding * 2 )
    {
        newScale = ( ( abb.w - padding * 2 ) / labelContainer.width ) * 100;
    }
    else if ( labelContainer.height > abb.h - padding * 2 ) 
    {
        newScale = ( ( abb.h - padding * 2 ) / labelContainer.height ) * 100;
    }
    else 
    {
        newScale = 100;
    }

    labelContainer.resize( newScale, newScale );
    align( ab, [ labelContainer ], "hcenter" );
    labelContainer.top = abb.top - padding * 2;

    var titleFrame = labelLayer.textFrames.add();
    titleFrame.contents = "Garment Colors for: " + orderNumber + "_" + designNumber + "_" + garmentCode;
    titleFrame.textRange.characterAttributes.size = 15;
    titleFrame.textRange.characterAttributes.fillColor = infoSwatch.color;
    titleFrame.width = titleFrame.width > abb.width * .9 ? abb.width * .9 : titleFrame.width;
    align( ab, [ titleFrame ], "hcenter" );
    titleFrame.top = ab.artboardRect[ 1 ] - padding;

    //export a jpg
    var newFileName = decodeURI( doc.path.toString() + "/INFO_" + orderNumber + "_" + designNumber + "_" + garmentCode ) + ".jpg"
    newFileName = normalizeLocalFilePath( newFileName );
    log.l( newFileName );
    // var jpgOpts = new ExportOptionsJPEG();
    // jpgOpts.qualitySetting = 100;
    // jpgOpts.artBoardClipping = true;
    // jpgOpts.horizontalScale = 200;
    // jpgOpts.verticalScale = 200;

    // doc.exportFile( new File( newFileName ), ExportType.JPEG, jpgOpts );

    exportJpg( newFileName, 0 );

    labelLayer.visible = false;
    ogLayers.forEach( function ( lay )
    {
        lay.visible = true;
    } )

    return;


}

