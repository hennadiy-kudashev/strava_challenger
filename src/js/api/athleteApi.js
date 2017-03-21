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

    getActivities() {
        const firstJan2017 = new Date('2017-01-01T00:00:00Z').getTime() / 1000;
        return super.get(`https://www.strava.com/api/v3/athlete/activities?after=${firstJan2017}&per_page=200&page=1`);
    }
}

export default AthleteApi;
