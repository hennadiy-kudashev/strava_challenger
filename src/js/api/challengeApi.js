import FetchApi from "./fetchApi";

class ChallengeApi extends FetchApi {
    constructor() {
        super({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }, body=> JSON.stringify(body));
    }

    getAll() {
        return super.get('/api/challenges');
    }

    addAthlete(challengeID, athlete) {
        return super.post(`/api/challenges/${challengeID}`, athlete);
    }
}

export default ChallengeApi;
