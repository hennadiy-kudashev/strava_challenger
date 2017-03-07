var express = require('express');
var app = new (express)();
var port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info('Production version: Listening on port %s.', port)
    }
});
