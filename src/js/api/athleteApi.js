import StravaApi from "./stravaApi";

class AthleteApi extends StravaApi {
    constructor(accessToken) {
        super(accessToken);
    }

    getFollowers() {
        return super.get('https://www.strava.com/api/v3/athlete/followers');
    }

    getAuthAthlete(){
        return super.get('https://www.strava.com/api/v3/athlete');
    }

    getInfo(athleteId) {
        return super.get(`https://www.strava.com/api/v3/athletes/${athleteId}`);
    }

    /**
     * Returns activities for given range.
     * @param {Date} before
     * @param {Date} after
     * @returns {Promise.<TResult>}
     */
    getActivities(after, before) {
        let url = `https://www.strava.com/api/v3/athlete/activities?per_page=200&page=1`;
        if (after){
            url += `&after=${after.getTime() / 1000}`;
        }
        if (before){
            url += `&before=${before.getTime() / 1000}`;
        }
        return super.get(url);
    }
}

export default AthleteApi;
