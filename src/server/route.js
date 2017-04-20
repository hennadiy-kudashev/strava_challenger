const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const api = require('./api');

//set env variable MONGOLAB_URI locally.
const mongoUrl = process.env.MONGOLAB_URI;

module.exports = function (app) {
    // configure app to use bodyParser(). This will let us get the data from a POST
    app.use(bodyParser.json()); //for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded
    
    MongoClient.connect(mongoUrl, (err, database) => {
        if (err) return console.log(err);
        console.log('Connection to mongo success.');

        api.register(app, database);
        
        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, './../../index.html'));
        });

        const port = process.env.PORT || 3000;
        
        app.listen(port, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.info('Listening on port %s.', port);
            }
        });
    });
};
