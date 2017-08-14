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
     * @returns {Promise.<Array>}
     */
    getActivities(after, before) {
        const PAGE_SIZE = 200; //max allowed by Strava.
        const PAGE_NUMBER = 1;
        return this._getActivitiesRecursion(after, before, PAGE_SIZE, PAGE_NUMBER, []);
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
        let url = `https://www.strava.com/api/v3/athlete/activities?per_page=${pageSize}&page=${pageNumber}`;
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
