const express = require('express');
const challengeController = require('./controller/challengeController');

module.exports.register = function (app, db) {
    const router = express.Router();

    router.use(function(req, res, next) {
        if (!req.accepts('json')) {
            return res.status(406).end();
        }
        res.contentType('application/json');
        next();
    });

    challengeController.register(router, db);
    app.use('/api', router);
};