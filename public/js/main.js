var can, ctx;

var drawImages = [];
var topVertOffset = 198;
var botVertOffset = 120;
var leftOff = 10;

var xImage = new Image();

var botNav;


var scrollImgs = [
    '<li class="scroll-img"><img src="img/image0.png"/></li> ',
    '<li class="scroll-img"><img src="img/image1.png"/></li> ',
    '<li class="scroll-img"><img src="img/image2.png"/></li> ',
    '<li class="scroll-img"><img src="img/image3.png"/></li> ',
    '<li class="scroll-img"><img src="img/image4.png"/></li> ',
    '<li class="scroll-img"><img src="img/image5.png"/></li> ',
    '<li class="scroll-img"><img src="img/image6.png"/></li> ',
    '<li class="scroll-img"><img src="img/image7.png"/></li> ',
    '<li class="scroll-img"><img src="img/image8.png"/></li> ',
    '<li class="scroll-img"><img src="img/image9.png"/></li> ',
    '<li class="scroll-img"><img src="img/image10.png"/></li>',
    '<li class="scroll-img"><img src="img/image11.png"/></li>',
    '<li class="scroll-img"><img src="img/image12.png"/></li>',
    '<li class="scroll-img"><img src="img/image13.png"/></li>',
    '<li class="scroll-img"><img src="img/image14.png"/></li>',
    '<li class="scroll-img"><img src="img/image15.png"/></li>',
    '<li class="scroll-img"><img src="img/image16.png"/></li>',
    '<li class="scroll-img"><img src="img/image17.png"/></li>',
    '<li class="scroll-img"><img src="img/image18.png"/></li>',
    '<li class="scroll-img"><img src="img/image19.png"/></li>',
    '<li class="scroll-img"><img src="img/image20.png"/></li>',
    '<li class="scroll-img"><img src="img/image21.png"/></li>',
    '<li class="scroll-img"><img src="img/image22.png"/></li>',
    '<li class="scroll-img"><img src="img/image23.png"/></li>',
    '<li class="scroll-img"><img src="img/image24.png"/></li>',
    '<li class="scroll-img"><img src="img/image25.png"/></li>',
    '<li class="scroll-img"><img src="img/image26.png"/></li>',
    '<li class="scroll-img"><img src="img/image27.png"/></li>',
    '<li class="scroll-img"><img src="img/image28.png"/></li>',
    '<li class="scroll-img"><img src="img/image29.png"/></li>',
    '<li class="scroll-img"><img src="img/image30.png"/></li>',
    '<li class="scroll-img"><img src="img/image31.png"/></li>',
    '<li class="scroll-img"><img src="img/image32.png"/></li>',
    '<li class="scroll-img"><img src="img/image33.png"/></li>',
    '<li class="scroll-img"><img src="img/image34.png"/></li>',
    '<li class="scroll-img"><img src="img/image35.png"/></li>',
    '<li class="scroll-img"><img src="img/image36.png"/></li>',
    '<li class="scroll-img"><img src="img/image37.png"/></li>',
    '<li class="scroll-img"><img src="img/image38.png"/></li>',
    '<li class="scroll-img"><img src="img/image39.png"/></li>',
    '<li class="scroll-img"><img src="img/image40.png"/></li>',
    '<li class="scroll-img"><img src="img/image41.png"/></li>',
    '<li class="scroll-img"><img src="img/image42.png"/></li>',
    '<li class="scroll-img"><img src="img/image43.png"/></li>',
    '<li class="scroll-img"><img src="img/image44.png"/></li>',
    '<li class="scroll-img"><img src="img/image45.png"/></li>',
    '<li class="scroll-img"><img src="img/image46.png"/></li>'
];
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
    if (window.innerWidth > 1000) {
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
                $(".jux-back-button").show();
                $(".description").show();
                $(".export-panel").show();
            }
        }
    };
    imgload.src = (img);
}

function render() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.fillStyle = "#E6E6E6";
    ctx.fillRect(0, 0, can.width, can.height);

    for (var i in drawImages) {
        ctx.drawImage(drawImages[i].img, drawImages[i].left,
            drawImages[i].up, drawImages[i].width, drawImages[i].height);
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
        $(".description").hide()
        $('.export-panel').hide();
        $('.jux-back-button').hide();

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
