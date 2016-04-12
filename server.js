var path    = require('path')
  , express = require('express')
  , exphbs  = require('express-handlebars')
  , fs      = require('fs')
  , bodyParser = require('body-parser')
  , Datastore = require('nedb');

db = new Datastore({ filename: 'db.json', autoload: true });

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var PORT = 8000;
var fileNumRE = /\d+/;
var maxImgIndex;

app.listen(PORT, function() {
    console.log('listening ' + PORT);
    fs.readdir(__dirname + '/gallery/', function(err, files) {
        files.forEach(function(f) {
            var val = parseInt(f.match(fileNumRE));
            if (val > maxImgIndex || maxImgIndex == null) {
                maxImgIndex = val;
            }
        });
    });
});

app.put('/upload', function (req, res) {
    if (maxImgIndex == null) {
        maxImgIndex = -1;
    }
    maxImgIndex++;

    // Enter text data (hypothetically, should enforce this finishing before
    //  we send response but ¯\_(ツ)_/¯)
    var entry = {
        commentary: req.body.commentary,
        imgIndex: maxImgIndex,
        time: new Date()
    };
    db.insert(entry, function(err, newEntry) {
        if (err) {
            console.log("DB ERROR: " + err);
        } else {
        }
    });

    // Save image
    var upload = parseDataURL(req.body.data);
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

app.get("/information/:id", function (req, res) {
    db.find({ "imgIndex": parseInt(req.params.id) }, function(err, entry) {
        if (err) {
            console.log("DB Find error: " + err);
        } else {
            res.json(entry);
        }
    });
});

app.get("/detail/:id", function (req, res) {
    db.find({ "imgIndex": parseInt(req.params.id) }, function(err, entry) {
        if (err) {
            console.log("DB Find error: " + err);
        } else {
            res.render("detail", {
                description: entry[0].commentary,
                imageURL: "/images/" + req.params.id
            });
        }
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

