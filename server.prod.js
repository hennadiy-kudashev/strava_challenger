var express = require('express');
var compression = require('compression');
const path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use(compression());
app.use('/dist', express.static('dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info('Production version: Listening on port %s.', port)
    }
});
