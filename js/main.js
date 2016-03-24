var can, ctx;

// Disable pull down to refresh:
// http://stackoverflow.com/questions/29008194
var target = window; // this can be any scrollable element
var last_y = 0;
target.addEventListener('touchmove', function(e){
    var scrolly = target.pageYOffset || target.scrollTop || 0;
    var direction = e.changedTouches[0].pageY > last_y ? 1 : -1;
    if(direction>0 && scrolly===0){
        e.preventDefault();
    }
    last_y = e.changedTouches[0].pageY;
});

$(function(){
    var curY, scroller, scrollerContent;
    init();

    var fullH = curY / 2;
    var viewportH = scroller.height();

    function init() {
        can = document.getElementById('paintCanvas');
        ctx = can.getContext('2d');
        can.width = window.innerWidth;
        can.height = window.innerHeight;

        ctx.fillStyle = "#E6E6E6";
        ctx.fillRect(0, 0, 10000, 10000);

        scroller = $('#scroller div.inner-scroll-area');

        var hammerScroll = new Hammer(scroller[0]);
        hammerScroll.on('pan', function(e) {
            doScroll(-e.deltaY / 10);
        });

        scrollerContent = $('.scroller-content');

        curY = 0;
        setupImages();
    }

    function setupImages() {
        scrollerContent.children().each(function(){
            var $this = $(this);
            $this.css('top', curY);
            curY += $this.outerHeight(true) + 300;

            addImageListeners(this);
        });
    }

    function addImageListeners(img) {
        var hammerImg = new Hammer(img);

        hammerImg.on('tap', function(ev) {
            stick(img);
        });
    }


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

var stick = function(el) {
    var dims = el.getBoundingClientRect();
    var img = $(el).find('img').attr('src');

    // This is extra jank
    imgload = new Image();
    imgload.onload = function() {
        ctx.drawImage(imgload, dims.left, dims.top, dims.width, dims.height);
    };
    imgload.src = (img);

}
