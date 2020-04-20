import ServerApi from "./serverApi";
import thresholdBy from "../components/challenge/view/thresholdBy";
import { THRESHOLD_CRITERION } from "../components/challenge/view/thresholds";

class ChallengeApi extends ServerApi {
  constructor() {
    super();
  }

  getAll() {
    //make criteria backward compatible for old challenges.
    return super.get('/api/challenges').then(challenges => challenges.map(challenge => ({
      ...challenge,
      criteria: {
        ...challenge.criteria,
        types: challenge.criteria.types || [challenge.criteria.type || 'Run'],
        threshold:{
          ...challenge.criteria.threshold,
          by: challenge.criteria.threshold.by || thresholdBy.TOTAL
        },
        minActivities: {
          value: challenge.criteria.minActivities ? challenge.criteria.minActivities.value: 0,
          by: challenge.criteria.minActivities ? challenge.criteria.minActivities.by : thresholdBy.TOTAL
        },
        activityLength: {
          value: challenge.criteria.activityLength ? challenge.criteria.activityLength.value: 0,
          criterion: challenge.criteria.activityLength ? challenge.criteria.activityLength.criterion: THRESHOLD_CRITERION.DISTANCE
        }
      }
    })));
  }

  getAthletes(challengeID) {
    return super.get(`/api/challenges/${challengeID}/athletes`);
  }

  addAthlete(challengeID) {
    return super.put(`/api/challenges/${challengeID}/athletes`);
  }

  create(challenge) {
    return super.put(`/api/challenges`, challenge);
  }

  update(challengeID, challenge) {
    return super.post(`/api/challenges/${challengeID}`, challenge);
  }

  remove(challengeID) {
    return super.remove(`/api/challenges/${challengeID}`);
  }
}

export default ChallengeApi;
