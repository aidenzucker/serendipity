var can, ctx;

var drawImages = [];

$(function(){
    can = document.getElementById('paintCanvas');
    ctx = can.getContext('2d');
    can.width = window.innerWidth;
    can.height = window.innerHeight;

    $('#scroller').click(function(e) {
        if (e.screenX < can.width && e.screenY < can.height) {
            testClick(e);
        }
    });

    var imageList = $('.image-list');

    imageList.find('img').each(function(){
        this.addEventListener('click', function(e) {
            stick(this);
        });
    });

    setInterval(render, 60);
});

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
            var newImage = new canImage(imgload, dims.left, dims.top,
                dims.width, dims.height);
            drawImages.push(newImage);
            if (drawImages.length >= 2) {
                $(".image-list").css("visibility", "hidden");
            }
        }
    };
    imgload.src = (img);
}

function render() {
    ctx.clearRect(0, 0, can.width, can.height);
        ctx.fillStyle = "#E6E6E6";
    for (var i in drawImages) {
        ctx.drawImage(drawImages[i].img, drawImages[i].left,
            drawImages[i].up, drawImages[i].width, drawImages[i].height);
        ctx.fillStyle = "red";
        ctx.fillRect(drawImages[i].left + drawImages[i].width,
            drawImages[i].up, drawImages[i].size, drawImages[i].size);
    }
}

function testClick(e) {
    e.clientY -= can.offsetTop;
    e.clientX -= can.offsetLeft;
    for (var i = drawImages.length - 1; i >= 0; i--) {
        var xOffset = drawImages[i].left + drawImages[i].width;
        var yOffset = drawImages[i].up;
        if (e.clientX > xOffset &&
             e.clientX < xOffset + drawImages[i].size &&
             e.clientY > yOffset &&
             e.clientY < yOffset + drawImages[i].size) {
            drawImages.splice(i, 1);
            if (drawImages.length < 2) {
                $(".image-list").css("visibility", "visible");
            }
            break;
        }
    }
}

function exportCan() {
    var dataURL = can.toDataURL('image/png');
    document.write('<img src="'+dataURL+'"/>');
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

