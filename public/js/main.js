var can, ctx;

var drawImages = [];
var topVertOffset = 198;
var botVertOffset = 120;
var leftOff = 10;

var xImage = new Image();

var botNav;

var resizeable = false;
var isDragging = false;
var startDrag, resizeFactor = 0;

// Make big array of imgs, randomize them
var scrollImageLast = 46;
var scrollImgs = []
for (var i = 0; i <= scrollImageLast; i++) {
    scrollImgs.push('<li class="scroll-img"><img src="img/image' + i + '.png"/></li>');
}
for (var i = 0; i < scrollImgs.length; i++) {
    var toSwap = Math.floor(Math.random() * scrollImgs.length);
    temp = scrollImgs[i];
    scrollImgs[i] = scrollImgs[toSwap];
    scrollImgs[toSwap] = temp;
}


$(function(){
    xImage.onload = function() { init(); };
    xImage.src = "img/buttons/x.png";
    botNav = $('.BottomNav').children().clone();
    $('.image-list').html(scrollImgs.join(' '));
});

function init() {
    can = document.getElementById('paintCanvas');
    ctx = can.getContext('2d');
    if (window.innerWidth > 445) {
        botVertOffset = 50;
        can.width = window.innerHeight - (topVertOffset + botVertOffset);
        can.height = window.innerHeight - (topVertOffset + botVertOffset);
    } else {
        can.width = 0.9 * window.innerWidth;
        can.height = 0.9 *  window.innerWidth;
    }
    leftOff = (window.innerWidth - can.width) / 2;
    $(can).css("left", leftOff);

    $('#scroller').click(function(e) {
        var mousePos = getCursorPosition(e);
        if (mousePos.x < can.width && mousePos.y < can.height) {
            testClick(mousePos);
        }
    });

    $(can).mousedown(function(e) {
        isDragging = true;
        startDrag = e;
    });
    $(can).mousemove(function(e) {
        if (isDragging && resizeable) {
            var diffX = startDrag.pageX - e.pageX;
            var diffY = startDrag.pageY - e.pageY;
            resizeFactor = Math.abs(diffX) > Math.abs(diffY) ? diffX : diffY;
        }
    });
    $(can).mouseup(function() {
        isDragging = false;
    });
    var hammertime = new Hammer(can);
    hammertime.get('pinch').set({
        enable: true
    });
    hammertime.on('pinch', function(ev) {
        resizeFactor = (((ev.scale - .5) / 2.5) - .5) * 600;
    });

    var imageList = $('.image-list');

    imageList.find('img').each(function(){
        this.addEventListener('click', function(e) {
            stick(this);
        });
    });

    // Dynamic listeners
    $(document).on('click', '.jux-back-button', function() {
        removeImage();
    });

    $(document).on('click', '.export', function() {
        exportCan();
    });

    setInterval(render, 60);

    $('.description').bind('focusin focus', function(e){
      e.preventDefault();
    })

    // Dan's random color changer
    // $('.TopNav').css({'background-color': '#' + (Math.random().toString(16) + "000000").substring(2,8)});
}

var stick = function(el) {
    var dims = el.getBoundingClientRect();
    var img = $(el).attr('src');

    // This is extra jank
    imgload = new Image();

    imgload.onload = function() {
        var dupImage = drawImages.find(function(obj){
            return obj.img == imgload;
        });

        if (!dupImage) {
            var newImage = new canImage(imgload, dims.left - leftOff, dims.top - topVertOffset,
                dims.width, dims.height);
            drawImages.push(newImage);
            if (drawImages.length >= 2) {
                $(".image-list").css("visibility", "hidden");
                $(".BottomNav").hide();
                $(".top-export-panel").show();
                $(".export-panel").show();

                $(can).addClass('resizeable-drag');
                resizeable = true;
                resizeFactor = 0;
            }
        }
    };
    imgload.src = (img);
}

function render() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.fillStyle = "#E6E6E6";
    ctx.fillRect(0, 0, can.width, can.height);

    for (var i = 0; i < drawImages.length; i++) {
        // Both images being drawn, resize
        if (i == 1) {
            ctx.drawImage(drawImages[i].img, drawImages[i].left - (resizeFactor / 2),
                drawImages[i].up - (resizeFactor / 2), drawImages[i].width + resizeFactor,
                drawImages[i].height + resizeFactor);
        } else {
            ctx.drawImage(drawImages[i].img, drawImages[i].left,
                drawImages[i].up, drawImages[i].width, drawImages[i].height);
        }


        // Draw X if only one img
        if (drawImages.length < 2) {
            ctx.drawImage(xImage, drawImages[i].left + drawImages[i].width,
                drawImages[i].up, drawImages[i].size, drawImages[i].size);
        }
    }
}

function testClick(m) {
    for (var i = drawImages.length - 1; i >= 0; i--) {
        var xOffset = drawImages[i].left + drawImages[i].width;
        var yOffset = drawImages[i].up;
        if (m.x > xOffset &&
             m.x < xOffset + drawImages[i].size &&
             m.y > yOffset &&
             m.y < yOffset + drawImages[i].size) {
            removeImage(i);
            break;
        }
    }
}

function removeImage(i) {
    if (i) {
        drawImages.splice(i, 1);
    } else {
        drawImages.pop();
    }

    if (drawImages.length < 2) {
        $(".image-list").css("visibility", "visible");
        $('.export-panel').hide();
        $(".top-export-panel").hide();
        $(can).removeClass('resizeable-drag');
        resizeable = false;

        $(".BottomNav").show();
    }
}

function exportCan() {
    return $.ajax({
        url: '/upload',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            data: can.toDataURL('image/png'),
            commentary: $('.description').val(),
        }),
        success: function (data) {
                window.location.href = '/gallery.html';
                return data;
            },
         error: function (error) {
                window.location.href = '/gallery.html';
                return "Error!";
            }
    });
}

function getCursorPosition(event) {
    var rect = can.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
}


//To disable scroll on focus
// $('.description').on('touchstart', function () {

//     $('#scroller').css({'overflow': 'hidden'});

// });



//ZE'EV: these could work and just be poorly implimented
//(like the first one does the opposite that we want i think)
//(and the second one is just wrong syntax i think)


//Disable scroll to top on textarea focus
//http://stackoverflow.com/questions/6740253/disable-scrolling-when-changing-focus-form-elements-ipad-web-app
// input.onfocus = function () {
//         window.scrollTo(0, 0);
//         document.body.scrollTop = 0;
//     }
// //tested this and it doesn't work on chrome or safari


// //attempt #2 from http://stackoverflow.com/questions/6740253/disable-scrolling-when-changing-focus-form-elements-ipad-web-app

//tested this and it doesn't work on chrome or safari


