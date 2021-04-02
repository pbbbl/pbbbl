
function setupCodeDocs () {
    var preEls = $( 'pre' );
    if ( !preEls || !preEls.length || preEls.length < 1 ) {
        return;
    }
    preEls.each( function ( i ) {
        if ( !this.id ) {
            this.id = 'pre-element-' + i;
        }
        var el = $( this );
        var id = el.attr( 'id' );

        var wrap = `<div class="code-block-wrapper" data-code-block="#${ id }" id="${ id }-wrapper"></div>`;
        el.wrap( wrap );
        wrap = $( `#${ id }-wrapper` );

        var cbtn = `<button class="copy-button button theme-primary-flat small" type="button" data-target="#${ id }" id="${ id }-copy">Copy</button>`;
        if ( !wrap.attr( 'data-built' ) ) {
            wrap.append( cbtn );
            wrap.attr( 'data-built', true );
        }




    } );
    var btns = $( '.copy-button' );
    btns.on( 'click', function () {
        var $t = $( this );
        var thash = $( this ).attr( 'data-target' ) || false;
        if ( !thash ) {
            return;
        }


        var target = $( thash );
        var ts = new Date();
        copyEl( target );
        var action = {
            action: 'Lesson Interaction',
            details: 'Copied code from code-block on ' + window.location.href
        };
        if ( auth?.user?.uid || false ) {
            action.uid = auth.user.uid;
        } else {
            action.uid = false;
            action.timestamp = ts.getTime();
        }
        trackActivity( action );
        /*copyEl( freshEl );
        */
    } );
}
setupCodeDocs();

function trackActivity ( data ) {
    if ( isDev ) {
        console.log( 'tracked trackActivity', data );

    } else {
        return;
    }
}

function copyEl ( el ) {
    try {
        var jqueryEl = el?.get()?.[ 0 ] || false;
        if ( jqueryEl ) {
            el = jqueryEl;
        }
    } catch ( err ) {

    }

    if ( window.getSelection && document.createRange ) { //Browser compatibility
        sel = window.getSelection();
        if ( sel.toString() == '' ) { //no text selection

            range = document.createRange(); //range object
            range.selectNodeContents( el ); //sets Range
            sel.removeAllRanges(); //remove all ranges from selection
            sel.addRange( range );//add Range to a Selection

            document.execCommand( "copy" );
            setTimeout( function () {
                if ( window.getSelection ) {
                    window.getSelection().removeAllRanges();
                }
                if ( document.selection ) {
                    document.selection.empty();
                }
            }, 250 );
        }
    } else if ( document.selection ) { //older ie
        sel = document.selection.createRange();
        if ( sel.text == '' ) { //no text selection
            range = document.body.createTextRange();
            range.moveToElementText( els );//sets Range
            range.select(); //make selection.
            document.execCommand( "copy" );


        }
    }
}