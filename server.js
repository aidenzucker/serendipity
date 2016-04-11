var path    = require('path')
  , express = require('express')
  , fs      = require('fs')
  , bodyParser = require('body-parser')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));

var PORT = 8000;
var fileNumRE = /\d+/;
var maxImgIndex;

app.listen(PORT, function() {
    console.log('listening ' + PORT);
    fs.readdir(__dirname + '/gallery/', function(err, files) {
        console.log(files);
        files.forEach(function(f) {
            var val = parseInt(f.match(fileNumRE));
            console.log('val: ' + val);
            if (val > maxImgIndex || maxImgIndex == null) {
                maxImgIndex = val;
            }
        });
    });
});

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
    if (maxImgIndex == null) {
        maxImgIndex = -1;
    }
    maxImgIndex++;

    var savePath = path.join(__dirname, 'gallery/img' + maxImgIndex + '.png');

    fs.writeFile(savePath, upload.data, function(err) {
        if (err) {
            console.log("ERROR: " + err);
            res.end('Fail');
        } else {
            res.end('Success');
        }
    });
});

app.get("/count", function (req, res) {
    res.json({ count: maxImgIndex });
});

app.get("/images/:id", function (req, res) {
    var path = __dirname + '/gallery/img' + req.params.id + '.png';

    res.sendFile(path);
});
