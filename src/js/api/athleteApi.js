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
        return super.get(`https://www.strava.com/api/v3/athlete/activities`);
    }
}

export default AthleteApi;
