'use strict';

const strava = require('strava-v3');

class StravaService {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    static getRequestAccessURL() {
        return Promise.resolve({url: strava.oauth.getRequestAccessURL({scope: 'activity:read'})});
    }

    static getTokenWithAthlete(code) {
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

    getCurrentAthlete() {
        return new Promise((resolve, reject) => {
            strava.athlete.get({'access_token': this.accessToken}, function (error, payload, limits) {
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

    getActivities(after, before, type) {
        const PAGE_SIZE = 200; //max allowed by Strava.
        const PAGE_NUMBER = 1;
        return this._getActivitiesRecursion(after, before, PAGE_SIZE, PAGE_NUMBER, [])
            .then(activities=>activities.filter(a=> a.type === type));
    }

    _getActivitiesRecursion(after, before, pageSize, pageNumber, prevActivities){
        return this._getActivities(after, before, pageSize, pageNumber).then(activities=>{
            const sumActivities = activities.concat(prevActivities);
            if (activities.length === pageSize){
                return this._getActivitiesRecursion(after, before, pageSize, pageNumber + 1, sumActivities);
            } else {
                return sumActivities;
            }
        });
    }

    _getActivities(after, before, pageSize, pageNumber){
        return new Promise((resolve, reject) => {
            const args = {
                'access_token': this.accessToken,
                'per_page': pageSize,
                'page': pageNumber
            };
            if (after){
                args.after = after.getTime() / 1000;
            }
            if (before){
                args.before = before.getTime() / 1000;
            }

            strava.athlete.listActivities(args, function (error, payload, limits) {
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
