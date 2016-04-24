(function() {
    var totalCount = 0;
    var loadAmount = 9;
    var currentImg = 0;
    var temp = "<li><a><img class='gal-img' src=''/></a></li>";

    $(window).scroll(function(e) {
        // Lazy Load when reached the bottom
        if (totalCount == 0) {
            return;
        }

        if($(window).scrollTop() + $(window).innerHeight() >= $('.gallery')[0].scrollHeight) {
            loadImageSet();
        }
    });

    function loadImageSet() {
        var c = Math.max(-1, currentImg - loadAmount);
        for (var i = currentImg; i > c; i--) {
           getImage(i);
        }
        currentImg = c
    }

    function getImage(i) {
        var newImage = $(temp);
        newImage.find('img').attr("src", '/images/' + i);
        newImage.find('a').attr("href", '/detail/' + i);

        $('.gallery-list').append(newImage);
    }

    $.ajax({
        url: '/count',
        type: 'GET',
        success: function (data) {
            totalCount = data.count;
            currentImg = data.count;

            loadImageSet();
        },
         error: function (error) {
            console.log('fail: ' + data);
        }
    });

})()
