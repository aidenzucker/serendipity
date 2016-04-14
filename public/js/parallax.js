    /* TOP OF DAN CODE */
    var blueDistance = $(window).width() * .6,
        bottomCurveDistance = $(window).width() * .6;

    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition + $(window).height() - topParallaxDiv) / ($(window).height() + 2 * (bottomParallaxDiv - topParallaxDiv));
        
        $('#blue').css({'padding-left': (percentScrolled * blueDistance) + 'px'});
        $('#bottom-curve').css({'padding-left': (percentScrolled * bottomCurveDistance) + 'px'});
    };



    $(window).on('scroll', function () {

        var topParallax = $('.picasso').offset().top,
            bottomParallax = topParallax + $('.picasso').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#blue').css({'padding-left': blueDistance + 'px'});
            $('#bottom-curve').css({'padding-left': bottomCurveDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax);            
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