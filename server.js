var path    = require('path')
  , express = require('express')
  , exphbs  = require('express-handlebars')
  , fs      = require('fs')
  , bodyParser = require('body-parser')
  , Datastore = require('nedb');

db = new Datastore({ filename: 'db.json', autoload: true });

var app = express();

var publicDir = __dirname + '/public'

// Hack allowing cutting off ".html" w/o making a bunch of routes
// http://stackoverflow.com/questions/16895047/
app.use(function(req, res, next) {
    if (req.path.indexOf('.') === -1 && req.path.indexOf('../') === -1) {
        var file = publicDir + req.path + '.html';
        fs.exists(file, function(exists) {
            if (exists)
                req.url += '.html';
            next();
        });
    }
    else {
        next();
    }
});

app.use(express.static(publicDir));
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
    var id = parseInt(req.params.id);
    if (id < 0 || id > maxImgIndex || id == null) {
        res.status(404).send('Invalid ID');
        return;
    }
    var path = __dirname + '/gallery/img' + id + '.png';

    res.sendFile(path);
});

app.get("/information/:id", function (req, res) {
    var id = parseInt(req.params.id);
    if (id < 0 || id > maxImgIndex || id == null) {
        res.status(404).send('Invalid ID');
        return;
    }
    db.find({ "imgIndex": id }, function(err, entry) {
        if (err) {
            console.log("DB Find error: " + err);
        } else {
            res.json(entry);
        }
    });
});

app.get("/detail/:id", function (req, res) {
    var id = parseInt(req.params.id);
    if (id < 0 || id > maxImgIndex || id == null) {
        res.status(404).send('Invalid ID');
        return;
    }

    db.find({ "imgIndex": parseInt(id) }, function(err, entry) {
        if (err) {
            console.log("DB Find error: " + err);
        } else {
            var nextIndex = id + 1;
            if (id >= maxImgIndex) {
                nextIndex = 0;
            }

            var prevIndex = id - 1;
            if (id <= 0) {
                prevIndex = maxImgIndex;
            }

            var detailURL = "www.serendipity.how/detail/" + id;
            var tweetURL = "https://twitter.com/home?status=Check%20out%20this%20juxtagraph%20and%20make%20your%20own%20at%20www.serendipity.how,%20a%20website%20about%20cultivating%20the%20art%20serendipity%20by%20%40aidenzucker%20here:" + detailURL;

            res.render("detail", {
                description: entry[0].commentary,
                tweet: tweetURL,
                imageURL: "/images/" + id,
                nextURL: "/detail/" + prevIndex,
                prevURL: "/detail/" + nextIndex,
            });
        }
    });
});

// WARNING: No routes beyond this point
app.get('*', function(req, res){
    res.status(404).send('Invalid Page');
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

