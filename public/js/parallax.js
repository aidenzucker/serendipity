    /* TOP OF DAN CODE */
    var blueDistance = $(window).width(),
        bottomCurveDistance = $(window).width(),
        leJouDistance = $(window).width() * .6,
        sheetMusicDistance = $(window).width() * .9,
        tanSketchDistance = $(window).width() * .5,
        whiteCircleDistance = $(window).width() * .3,
        woodenCurvesDistance = $(window).width() * .4,
        backgroundDistance = $(window).width() * .2,

        pupilDistance = $(window).width() * .3, //this might not work bc not whole width

        portraitDistance = $(window).width(),
        drawingDistance = $(window).width()
        ;

    var menuHeight = $('.StickyMenu').height();

    function calculatePos (currentScrollPosition, topParallaxDiv, bottomParallaxDiv, whichOne) {
        //Total distance moved by certain div


        var percentScrolled = (currentScrollPosition + $(window).height() - topParallaxDiv) / ($(window).height() + 2 * (bottomParallaxDiv - topParallaxDiv));
        
        if (whichOne === 'picasso') {
        $('#blue').css({'padding-left': (percentScrolled * blueDistance) + 'px'});
        $('#bottom-curve').css({'margin-left': (-1 * percentScrolled * bottomCurveDistance) + 'px'});
        $('#le-jou').css({'padding-right': (percentScrolled * leJouDistance) + 'px'});
        $('#sheet-music').css({'margin-left': (-1 * percentScrolled * sheetMusicDistance) + 'px'});
        $('#tan-sketch').css({'padding-right': (percentScrolled * tanSketchDistance) + 'px'});
        $('#white-circle').css({'margin-left': (-1 * percentScrolled * whiteCircleDistance) + 'px'});
        $('#wooden-curves').css({'padding-right': (percentScrolled * woodenCurvesDistance) + 'px'});
        $('#background').css({'margin-left': (-1 * percentScrolled * backgroundDistance) + 'px'});
        }

        if (whichOne === 'eye') {
        $('#pupil').css({'margin-top': (percentScrolled * pupilDistance) + 'px'});
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
            $('#le-jou').css({'padding-right': leJouDistance + 'px'});
            $('#sheet-music').css({'margin-left': sheetMusicDistance + 'px'});
            $('#tan-sketch').css({'padding-right': tanSketchDistance + 'px'});
            $('#white-circle').css({'padding-right': whiteCircleDistance + 'px'});
            $('#wooden-curves').css({'padding-left': woodenCurvesDistance + 'px'});
            $('#background').css({'padding-right': backgroundDistance + 'px'});

        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'picasso');            
        }
    });


    /* RAND */
    $(window).on('scroll', function () {

        var topParallax = $('.eye').offset().top,
            bottomParallax = topParallax + $('.eye').height();

        var scrollPos = $(window).scrollTop();

        if (scrollPos > bottomParallax ) {
            //Put divs in final position, do this individually on all of them
            $('#pupil').css({'margin-top': pupilDistance + 'px'});

        } else if (scrollPos > topParallax - $(window).height()) {
            calculatePos(scrollPos, topParallax, bottomParallax, 'eye');            
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