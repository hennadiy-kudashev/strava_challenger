'use strict';

const strava = require('strava-v3');

class StravaService {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  static getRequestAccessURL() {
    return Promise.resolve({ url: strava.oauth.getRequestAccessURL({ scope: 'activity:read' }) });
  }

  static getTokenWithAthlete(code) {
    return strava.oauth.getToken(code);
  }

  static refreshToken(refreshToken) {
    return strava.oauth.refreshToken(refreshToken);
  }

  getCurrentAthlete() {
    return new Promise((resolve, reject) => {
      strava.athlete.get({ 'access_token': this.accessToken }, function (error, payload, limits) {
        if (error) {
          reject(error);
        }
        if (payload.errors) {
          reject(payload);
        } else {
          resolve(payload);
        }
      });
    });
  }

  getActivities(after, before, types) {
    const PAGE_SIZE = 200; //max allowed by Strava.
    const PAGE_NUMBER = 1;
    return this._getActivitiesRecursion(after, before, PAGE_SIZE, PAGE_NUMBER, [])
      //restrict types if something is selected
      .then(activities => activities.filter(a => types.length > 0 ? types.includes(a.type) : true));
  }

  _getActivitiesRecursion(after, before, pageSize, pageNumber, prevActivities) {
    return this._getActivities(after, before, pageSize, pageNumber).then(activities => {
      const sumActivities = activities.concat(prevActivities);
      if (activities.length === pageSize) {
        return this._getActivitiesRecursion(after, before, pageSize, pageNumber + 1, sumActivities);
      } else {
        return sumActivities;
      }
    });
  }

  _getActivities(after, before, pageSize, pageNumber) {
    const args = {
      'access_token': this.accessToken,
      'per_page': pageSize,
      'page': pageNumber
    };
    if (after) {
      args.after = after.getTime() / 1000;
    }
    if (before) {
      args.before = before.getTime() / 1000;
    }

    return strava.athlete.listActivities(args);
  }
}

module.exports = StravaService;
