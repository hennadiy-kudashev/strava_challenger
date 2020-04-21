import ServerApi from "./serverApi";

class ClubApi extends ServerApi {
    getAthleteClubs() {
        return super.get(`/api/clubs`);
    }
}

export default ClubApi;
