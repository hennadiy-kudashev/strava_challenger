import StravaApi from "./stravaApi";

class AthleteApi extends StravaApi {
    constructor() {
        super();
    }

    getFollowers() {
        return super.get('https://www.strava.com/api/v3/athlete/followers');
    }

    getAuthAthlete(){
        return super.get('https://www.strava.com/api/v3/athlete');
    }
}

export default AthleteApi;