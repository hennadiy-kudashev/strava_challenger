import ServerApi from "./serverApi";

class ChallengeApi extends ServerApi {
    constructor() {
        super();
    }

    getAll() {
        return super.get('/api/challenges');
    }

    addAthlete(challengeID, athlete) {
        return super.post(`/api/challenges/${challengeID}`, athlete);
    }
}

export default ChallengeApi;
