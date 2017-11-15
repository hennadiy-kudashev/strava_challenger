'use strict';

const strava = require('strava-v3');

class StravaService {
    constructor() {

    }

    getRequestAccessURL(redirectURL){
        return Promise.resolve({url: strava.oauth.getRequestAccessURL({scope: 'view_private'})});
    }

    getTokenWithAthlete(code) {
        return new Promise((resolve, reject)=> {
            strava.oauth.getToken(code, function (error, payload, limits) {
                if (error) {
                    reject(error);
                }
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
