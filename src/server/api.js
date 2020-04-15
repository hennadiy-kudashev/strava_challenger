const express = require('express');
const jwt = require('jsonwebtoken');
const challengeController = require('./controller/challengeController');
const userController = require('./controller/userController');
const authController = require('./controller/authController');
const config = require('./config');

module.exports.register = function (app, db) {
    const router = express.Router();

    //order is important to define before access_token verification;
    authController.register(router, db);

    router.use(function (req, res, next) {
        if (!req.accepts('json')) {
            return res.status(406).end();
        }
        const accessToken = req.headers['x-access-token'];
        if (accessToken) {
            jwt.verify(accessToken, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).send({
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.strava = {
                        athleteID: decoded.athleteID,
                        accessToken: decoded.accessToken,
                        refreshToken: decoded.refreshToken,
                        expiresAt: decoded.expiresAt,
                    };
                    req.userID = decoded.userID;
                    res.contentType('application/json');
                    next();
                }
            });
        } else {
            return res.status(403).send({
                message: 'No access token provided.'
            });
        }
    });

    challengeController.register(router, db);
    userController.register(router, db);
    app.use('/api', router);
};
