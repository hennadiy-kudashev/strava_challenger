import StravaApi from './stravaApi';

class AthleteApi extends StravaApi{
    constructor(accessToken){
        super(accessToken);
    }

    getFollowers(){
        return super.request('https://www.strava.com/api/v3/athlete/followers');
    }
}

export default AthleteApi;