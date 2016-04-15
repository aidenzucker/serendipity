    /* TOP OF DAN CODE */
    var imgXrayDistance = $(window).width(),
        imgWavesDistance = $(window).width(),
        imgStickyNotesDistance = $(window).width(),
        imgSquaresDistance = $(window).width()
        imgVelcroDistance = $(window).width(),
        imgLoopsDistance = $(window).width(),
        imgPetriDistance = $(window).width(),
        imgCirclesDistance = $(window).width()
        ;


    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv, whichOne) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition + $(window).height() - topParallaxDiv) / ($(window).height() + 2 * (bottomParallaxDiv - topParallaxDiv));

        if (whichOne === 'x-ray') {
            $('#img-xray').css({'padding-left': (percentScrolled * imgXrayDistance) + 'px'});
            $('#img-waves').css({'padding-right': (percentScrolled * imgWavesDistance) + 'px'});
        }

        if (whichOne === 'sticky-notes') {
        $('#img-sticky-notes').css({'padding-left': (percentScrolled * imgStickyNotesDistance) + 'px'});
        $('#img-squares').css({'padding-right': (percentScrolled * imgSquaresDistance) + 'px'});
        }

        if (whichOne === 'velcro') {
        $('#img-velcro').css({'padding-left': (percentScrolled * imgVelcroDistance) + 'px'});
        $('#img-loops').css({'padding-right': (percentScrolled * imgLoopsDistance) + 'px'});
        }

        if (whichOne === 'penicillin') {
        $('#img-petri').css({'padding-left': (percentScrolled * imgPetriDistance) + 'px'});
        $('#img-circles').css({'padding-right': (percentScrolled * imgCirclesDistance) + 'px'});
        }
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
            calculatePos(scrollPos, topParallax, bottomParallax, 'x-ray');            
        }

    });

    //2 STICK NOTE 
    $(window).on('scroll', function () {

        var topParallax = $('#sticky-notes').offset().top,
            bottomParallax = topParallax + $('#sticky-notes').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#img-sticky-notes').css({'padding-left': imgStickyNotesDistance + 'px'});
            $('#img-squares').css({'padding-right': imgSquaresDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'sticky-notes');            
        }

    });

    //3 VELCRO
    $(window).on('scroll', function () {

        var topParallax = $('#velcro').offset().top,
            bottomParallax = topParallax + $('#velcro').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#img-velcro').css({'padding-left': imgVelcroDistance + 'px'});
            $('#img-loops').css({'padding-right': imgLoopsDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'velcro');            
        }

    });

     //4 PETRI
    $(window).on('scroll', function () {

        var topParallax = $('#penicillin').offset().top,
            bottomParallax = topParallax + $('#penicillin').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#img-petri').css({'padding-left': imgPetriDistance + 'px'});
            $('#img-circles').css({'padding-right': imgCirclesDistance + 'px'});
        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'penicillin');            
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
