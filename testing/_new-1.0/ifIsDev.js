var wfUseAutoSlideHeight = function () {
    var allSliders = $( '.w-slider' );
    $( '.w-slider.auto-size' ).attr( 'data-auto-size', true );
    $( '.w-slider.auto-size' ).css( { opacity: 0 } );
    var hasSliders = allSliders && allSliders.length && allSliders.length > 0;
    if ( !hasSliders ) {
        return;
    }


    var autoIdElIndex = 0;


    var activeSlideHeight = 1;
    var firstRun = false;
    var tallestSlideHeight = 1;
    var sliderMaskDiff = 1;
    var startEl = $( '.w-slider.auto-size .w-slide:first-child' );
    var started = false;
    function autoSliderHeight () {
        var els = $( '.w-slider.auto-size .w-slide' );
        if ( !startEl ) {
            startEl = $( '.w-slider.auto-size .w-slide:first-child' );
        }
        els.each( function ( elIndex ) {

            var el = $( this );
            var id = el.attr( 'id' ) || false;
            if ( !el.attr( 'id' ) ) {
                el = autoIdEl( el );
                id = el.attr( 'id' );
                if ( !el ) {
                    return false;
                }
            }
            id = el.attr( 'id' );
            var slideHeight = measureSlides( id );
            var elemToObserve = this;
            var mask = el.parent();
            if ( !mask || !mask.length || mask.length == 0 || !mask.hasClass( 'w-slider-mask' ) ) {

                return false;
            }
            var slider = mask.parent();
            if ( !slider || !slider.length || slider.length == 0 || !slider.hasClass( 'w-slider' ) ) {

                return false;
            }
            var sliderHeight = slider.height();
            var maskHeight = mask.height();
            // if ( innerHeight && innerHeight > tallestSlideHeight ) {
            //     tallestSlideHeight = innerHeight;
            //     largestEl = _el;


            //     sliderMaskDiff = sliderHeight - maskHeight;
            //     if(elIndex + 1 >= els.length){
            //         return runFirstSlide();
            //     }

            // }


            var watchingAttr = 'data-watch-slide';

            var watching = el.attr( watchingAttr ) || false;

            if ( !watching ) {
                el.attr( watchingAttr, true );
                var logged = false;
                var observer = new MutationObserver( function ( mutations ) {
                    mutations.forEach( function ( mutation ) {
                        var mname = mutation.attributeName;

                        var validName = mname == 'aria-hidden';
                        if ( !validName ) {
                            return;
                        }

                        var mel = mutation.target;
                        var isSlide = mel.classList.contains( 'w-slide' );
                        var matched = mel.id === id;
                        var melVisible = false;
                        if ( !mel.ariaHidden || mel.ariaHidden == 'undefined' || mel.ariaHidden == null || mel.ariaHidden == false ) {
                            melVisible = true;
                        }
                        melVisible = isSlide && matched && melVisible;


                        if ( !melVisible ) {
                            return;
                        }


                        if ( melVisible ) {

                            const slideHeight = $( mel ).attr( 'data-slide-height' );
                            activeSlideHeight = slideHeight;
                            resizeSlide( {
                                height: activeSlideHeight,
                                el: startEl
                            } );


                        }


                    } );
                } );
                observer.observe( elemToObserve, { attributes: true } );

            }
        } );
    }
    function runFirstSlide () {
        if ( !startEl ) {
            startEl = $( '.w-slider.auto-size .w-slide:first-child' );
        }
        const startEls = $( '.w-slider.auto-size .w-slide' );
        var mask = startEl.parent();
        var slider = mask.parent();
        var sliderHeight = slider.height();
        var maskHeight = mask.height();


        let largestEl = null;
        const filterToLargest = startEls.each( _elIndex => {
            var elId;
            var _el = $( this );
            if ( !_el.attr( 'id' ) ) {
                var newEl = autoIdEl( _el );
                console.log( 'newEl', newEl );
                elId = newEl.attr( 'id' ) || false;
                if ( !elId ) {
                    return false;
                }
            }

            const innerHeight = measureSlides( elId );
            if ( innerHeight && innerHeight > tallestSlideHeight ) {
                tallestSlideHeight = innerHeight;
                sliderMaskDiff = sliderHeight - maskHeight;
            }
            if ( _elIndex + 1 >= startEls.length ) {
                var startId = startEl.attr( 'id' ) || false;
                if ( !startId ) {
                    startEl = autoIdEl( startEl );
                    startId = startEl.attr( 'id' );
                }
                if ( !startId ) {
                    // console.log( 'no-first-slide-id' );
                    return;
                }
                if ( !activeSlideHeight ) {
                    console.log( 'no-first-slide height' );
                    return;
                }
                resizeSlide( {
                    height: activeSlideHeight,
                    el: startEl
                } );
                // $( '.w-slider.auto-size' ).css( { opacity: 1 } );



            }
        } );

    }
    function measureSlides ( id ) {
        var child = $( '#' + id + ' > *' );
        var childHeight;
        if ( child.length ) {
            var children = child;
            childHeight = getTotalSlideHeight( children ) || false;
        } else {
            var childCr = child.getBoundingClientRect();
            childHeight = childCr.height;
        }
        if ( !childHeight ) {
            return;
        }
        var el = $( '#' + id );
        if ( !el.attr( 'aria-hidden' ) ) {
            activeSlideHeight = childHeight;
        }
        el.attr( 'data-slide-height', childHeight );
        return childHeight;
    }

    function getTotalSlideHeight ( children ) {
        const cr = {};
        for ( let index = 0; index < children.length; index++ ) {
            try {

                const child = children.get( index );
                const _cr = child.getBoundingClientRect();
                if ( !cr.height ) {
                    cr.height = 1;
                    cr.height = cr.height - 1;
                }
                cr.height += cr.height == 1 ? ( -1 ) + _cr.height : _cr.height;


            } catch ( err ) {

            }
            if ( ( index + 1 >= children.length ) && cr.height && cr.height != 0 ) {
                return cr.height;
            }

        }
    }

    function resizeSlide ( { el, height } ) {
        var mask = el.parent();
        var slider = mask.parent();
        var sliderHeight = height + sliderMaskDiff;
        slider.css( { height: sliderHeight + 'px', minHeight: '0px', maxHeight: 'none' } );
        mask.css( { height: height + 'px', minHeight: '0px', maxHeight: 'none' } );

        $( '.w-slider.auto-size' ).css( { opacity: 1 } );
    }

    function autoIdEl ( el ) {

        autoIdElIndex++;
        if ( !el || !el.length ) {
            return false;
        }
        if ( typeof autoIdElIndex != 'number' ) {

            autoIdElIndex = 1;

        }
        if ( !el.attr( 'id' ) ) {
            var id = 'auto-id-el-' + autoIdElIndex;
            el.attr( 'id', id );
        }
        return el;
    }
    window.addEventListener( 'resize', function () {
        if ( unbindSliderHeight && typeof unbindSliderHeight == 'function' ) {
            unbindSliderHeight = false;
            return autoSliderHeight();
        }
        return;
    } );
    autoSliderHeight();


};

wfUseAutoSlideHeight();