import ServerApi from "./serverApi";

class ChallengeApi extends ServerApi {
    constructor() {
        super();
    }

    getAll() {
        return super.get('/api/challenges');
    }

    getAthletes(challengeID) {
        return super.get(`/api/challenges/${challengeID}/athletes`);
    }

    addAthlete(challengeID) {
        return super.put(`/api/challenges/${challengeID}/athletes`);
    }

    create(challenge){
        return super.put(`/api/challenges`, challenge);
    }

    update(challengeID, challenge){
        return super.post(`/api/challenges/${challengeID}`, challenge);
    }
    
    remove(challengeID){
        return super.remove(`/api/challenges/${challengeID}`);
    }
}

export default ChallengeApi;
