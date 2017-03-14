import StravaApi from "./stravaApi";

class ClubApi extends StravaApi {
    constructor(clubID) {
        super();
        this.clubID = clubID;
    }

    static createURunClub() {
        return new ClubApi('U_Run');
    }

    getMembers() {
        return super.get(`https://www.strava.com/api/v3/clubs/${this.clubID}/members1`);
    }
}

export default ClubApi;