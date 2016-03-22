$(function(){
    var scroller = $('#scroller div.innerScrollArea');
    var scrollerContent = scroller.children('ul');
    scrollerContent.children().clone().appendTo(scrollerContent);
    var curY = 0;
    scrollerContent.children().each(function(){
        var $this = $(this);
        $this.css('top', curY);
        curY += $this.outerHeight(true) + 100;
    });
    var fullH = curY / 2;
    var viewportH = scroller.height();

    // Scrolling speed management
    var controller = {curSpeed:2, fullSpeed:2};
    var scrollSpeed = 10;
    var $controller = $(controller);

    // Scrolling management; start the automatical scrolling
    var doScroll = function(ySpeed)
    {
        var curY = scroller.scrollTop();
        var newY = curY + ySpeed;
        if (newY > fullH * 2 - viewportH) {
            newY -= fullH;
        }
        if (newY < 0) {
            newY += fullH;
        }
        scroller.scrollTop(newY);
    };

    window.addEventListener('wheel', function(e) {
        doScroll(e.deltaY);
    });
});
