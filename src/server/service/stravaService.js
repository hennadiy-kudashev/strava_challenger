'use strict';

const strava = require('strava-v3');

class StravaService {
    constructor() {

    }

    getTokenWithAthlete(code) {
        return new Promise((resolve, reject)=> {
            strava.oauth.getToken(code, function (error, payload, limits) {
                if (payload.errors) {
                    reject(payload);
                }
                else {
                    resolve(payload);
                }
            });
        });
    }
}
module.exports = StravaService;
