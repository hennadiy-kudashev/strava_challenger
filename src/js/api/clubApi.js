import StravaApi from './stravaApi';

class ClubApi extends StravaApi{
    constructor(accessToken, clubID){
        super(accessToken);
        this.clubID = clubID;
    }
    
    static createURunClub(accessToken){
        return new ClubApi(accessToken, 'U_Run');
    }

    getMembers(){
        return super.request(`https://www.strava.com/api/v3/clubs/${this.clubID}/members`);
    }
}

export default ClubApi;