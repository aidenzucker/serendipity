(function() {
    // Change if add images
    var scrollImageLast = 46;
    var marqueeLength = 8;
    var rand;
    for (var i = 0; i <= marqueeLength; i++) {
        rand = Math.floor(Math.random() * scrollImageLast);
        $('#marquee-right').append('<img src="img/image' + rand + '.png"/>');
        rand = Math.floor(Math.random() * scrollImageLast);
        $('#marquee-left').append('<img src="img/image' + rand + '.png"/>');
    }
})()
