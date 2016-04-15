    /* TOP OF DAN CODE */
    var blueDistance = $(window).width(),
        bottomCurveDistance = $(window).width() * .6,
        portraitDistance = $(window).width(),
        drawingDistance = $(window).width()
        ;

    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv, whichOne) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition + $(window).height() - topParallaxDiv) / ($(window).height() + 2 * (bottomParallaxDiv - topParallaxDiv));
        
        if (whichOne === 'picasso') {
        $('#blue').css({'padding-left': (percentScrolled * blueDistance) + 'px'});
        $('#bottom-curve').css({'padding-left': (percentScrolled * bottomCurveDistance) + 'px'});
        }

        if (whichOne === 'fuller') {
        $('#drawing').css({'padding-right': (percentScrolled * drawingDistance) + 'px'});
        $('#portrait').css({'padding-left': (percentScrolled * portraitDistance) + 'px'});
        }
    };


    /* PICASSO */
    $(window).on('scroll', function () {

        var topParallax = $('.picasso').offset().top,
            bottomParallax = topParallax + $('.picasso').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#blue').css({'padding-left': blueDistance + 'px'});
            $('#bottom-curve').css({'padding-left': bottomCurveDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'picasso');            
        }
    });


    /* FULLER */
    $(window).on('scroll', function () {

        var topParallax = $('.fuller').offset().top,
            bottomParallax = topParallax + $('.fuller').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#drawing').css({'padding-right': drawingDistance + 'px'});
            $('#portrait').css({'padding-left': portraitDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'fuller');            
        }
    });



    /* BOTTOM OF DAN CODE */

    // Note from Aiden:
    //CURRENTLY:
    // Start animation: top of div at bottom of window
    // Stop animation: bottom of div at bottom of window
    //
    //DESIRED:
    //Start animation: top of div at bottom of window
    //Stop animation: bottom of div at TOP of window