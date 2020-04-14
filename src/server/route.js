const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const api = require('./api');
const config = require('./config');

module.exports = function (app) {
    // configure app to use bodyParser(). This will let us get the data from a POST
    app.use(bodyParser.json()); //for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

    if (!config.mongoUrl){
        console.error('Enviroment variable MONGOLAB_URI should be specified.');
        return;
    }

    MongoClient.connect(config.mongoUrl, (err, client) => {
        if (err) return console.log(err);
        console.log('Connection to mongo success.');

        api.register(app, client.db());

        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, './../../index.html'));
        });

        app.listen(config.port, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.info('Listening on port %s.', config.port);
            }
        });
    });
};
