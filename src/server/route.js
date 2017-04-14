const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

//set env variable MONGOLAB_URI locally.
const mongoUrl = process.env.MONGOLAB_URI;

module.exports = function (app) {

    var db;
    // configure app to use bodyParser(). This will let us get the data from a POST
    app.use(bodyParser.json()); //for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

    app.get('/api', (req, res) => {
        db.collection('challenges').find().toArray(function (err, results) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    });

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './../../index.html'))
    });

    const port = process.env.PORT || 3000;

    MongoClient.connect(mongoUrl, (err, database) => {
        if (err) return console.log(err);
        console.log('Connection to mongo success.');
        db = database;
        app.listen(port, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.info('Listening on port %s.', port);
            }
        });
    })
};
