(function() {
    var totalCount = 0;
    var loadAmount = 9;
    var currentImg = 0;

    $(window).scroll(function(e) {
        // Lazy Load when reached the bottom
        if($(window).scrollTop() + $(window).innerHeight() >= $('.gallery')[0].scrollHeight) {
            loadImageSet();
        }
    });

    var temp = "<li><a><img class='gal-img' src=''/></a></li>";

    function loadImageSet() {
        var c = Math.min(totalCount, currentImg + loadAmount);
        for (var i = currentImg; i < c; i++) {
           getImage(i);
        }
        currentImg = c
    }

    function getImage(i) {
        var newImage = $(temp);
        newImage.find('img').attr("src", '/images/' + i);
        newImage.find('a').attr("href", '/detail/' + i);

        $('.gallery-list').prepend(newImage);
    }

    $.ajax({
        url: '/count',
        type: 'GET',
        success: function (data) {
            totalCount = data.count;

            loadImageSet();
        },
         error: function (error) {
            console.log('fail: ' + data);
        }
    });

})()
