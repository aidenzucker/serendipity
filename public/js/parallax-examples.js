    /* TOP OF DAN CODE */
    var imgXrayDistance = $(window).width(),
        imgWavesDistance = $(window).width();
        // imgStickyNotesDistance = $(window).width(),
        // imgSquaresDistance = $(window).width(),
        


    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition + $(window).height() - topParallaxDiv) / ($(window).height() + 2 * (bottomParallaxDiv - topParallaxDiv));

        $('#img-xray').css({'padding-left': (percentScrolled * imgXrayDistance) + 'px'});
        $('#img-waves').css({'padding-right': (percentScrolled * imgWavesDistance) + 'px'});
    };


    //1 X-RAY 
    $(window).on('scroll', function () {

        var topParallax = $('#xray').offset().top,
            bottomParallax = topParallax + $('#xray').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#img-xray').css({'padding-left': imgXrayDistance + 'px'});
            $('#img-waves').css({'padding-right': imgWavesDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax);            
        }

    });

    //2 STICK NOTE 
    $(window).on('scroll', function () {

        var topParallax = $('#sticky-notes').offset().top,
            bottomParallax = topParallax + $('#sticky-notes').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#img-sticky-notes').css({'padding-left': imgXrayDistance + 'px'});
            $('#img-squares').css({'padding-right': imgWavesDistance + 'px'});
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