var path    = require('path');
var express = require('express');
var fs      = require('fs');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));


var PORT = 8000;

app.listen(PORT, function() {
    console.log('listening ' + PORT);
});

var imgCounter = 0;

function parseDataURL(body) {
    var match = /data:([^;]+);base64,(.*)/.exec(body);
    if(!match) {
        return null;
    }

    return {
        contentType: match[1],
        data: new Buffer(match[2], 'base64')
    };
}

app.put('/upload', function (req, res) {
    var upload = parseDataURL(req.body.data);
    var savePath = path.join(__dirname, 'public/img/gallery/img' + imgCounter + '.png');
    imgCounter++;

    fs.writeFile(savePath, upload.data, function(err) {
        if (err) {
            console.log("ERROR: " + err);
            res.end('Fail');
        } else {
            res.end('Success');
        }
    });
});
