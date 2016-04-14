    /* TOP OF DAN CODE */
    var blueDistance = $(window).width() * .6,
        bottomCurveDistance = $(window).width() * .6;

    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition - topParallaxDiv) / (bottomParallaxDiv - topParallaxDiv);
        $('#blue').css({'padding-left': (percentScrolled * blueDistance) + 'px'});
        $('#bottom-curve').css({'padding-left': (percentScrolled * bottomCurveDistance) + 'px'});
    };

    var topParallax = $('.picasso').position().top,
        bottomParallax = topParallax + $('.picasso').height();

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos > bottomParallax + menuHeight) {
            //Put divs in final position, do this individually on all of them
            $('#blue').css({'padding-left': blueDistance + 'px'});
            $('#bottom-curve').css({'padding-left': bottomCurveDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            //calculatePos(scrollPos, topParallax, bottomParallax);            
        }

    });

    /* BOTTOM OF DAN CODE */