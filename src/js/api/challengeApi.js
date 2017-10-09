import ServerApi from "./serverApi";
import ChallengeDTO from './challengeDTO';

class ChallengeApi extends ServerApi {
    constructor() {
        super();
    }

    getAll() {
        return super.get('/api/challenges').then(items=>items.map(item=>new ChallengeDTO(item).fromServer()));
    }

    addAthlete(challengeID, athlete) {
        return super.post(`/api/challenges/${challengeID}`, athlete);
    }

    create(challenge){
        return super.put(`/api/challenges`, new ChallengeDTO(challenge).toServer())
            .then(item=>new ChallengeDTO(item).fromServer());
    }

    update(challenge){
        return super.post(`/api/challenges`, new ChallengeDTO(challenge).toServer())
            .then(item=>new ChallengeDTO(item).fromServer());
    }
    
    remove(challengeID){
        return super.remove(`/api/challenges/${challengeID}`);
    }
}

export default ChallengeApi;
