var can, ctx;

var drawImages = [];
var verticalOffset = 181;

var xImage = new Image();

var botNav;

$(function(){
    xImage.onload = function() { init(); };
    xImage.src = "img/x.png";
    botNav = $('.BottomNav').children().clone();
});

function init() {
    can = document.getElementById('paintCanvas');
    ctx = can.getContext('2d');
    can.width = window.innerWidth;
    can.height = window.innerHeight - verticalOffset;

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
    $(document).on('click', '.jux-back', function() {
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
            var newImage = new canImage(imgload, dims.left, dims.top - verticalOffset,
                dims.width, dims.height);
            drawImages.push(newImage);
            if (drawImages.length >= 2) {
                $(".image-list").css("visibility", "hidden");
                $(".description").show();
                $('.export-panel').show();

                $('.BottomNav').html("<a class='jux-back'>Back</a>");
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

        $(".BottomNav").html(botNav);
    }
}

function exportCan() {
    return $.ajax({
        url: '/upload',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({data: can.toDataURL('image/png')}),
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

function getCursorPosition(event) {
    var rect = can.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
}
