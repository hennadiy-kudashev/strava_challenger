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

    create(challenge){
        challenge.id = Math.random().toString(36).substr(2, 9);
        return Promise.resolve(challenge);
    }

    edit(challenge){
        return Promise.resolve(challenge);
    }
}

export default ChallengeApi;
