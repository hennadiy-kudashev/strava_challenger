import * as types from "./actionTypes";
import ChallengeApi from "../api/challengeApi";

export function createChallenge(challenge) {
    return function (dispatch) {
        return new ChallengeApi().create(challenge).then(challenge => {
            dispatch(addChallenges([challenge]));
            return challenge;
        });
    };
}

export function editChallenge(challengeID, challenge) {
    return function (dispatch) {
        return new ChallengeApi().update(challengeID, challenge).then((challenge) => {
            dispatch({type: types.EDIT_CHALLENGE, challenge});
        });
    };
}

export function removeChallenge(challengeID) {
    return function (dispatch) {
        return new ChallengeApi().remove(challengeID).then(() => {
            dispatch({type: types.REMOVE_CHALLENGE, challengeID});
        });
    };
}

export function getChallenges() {
    return function (dispatch) {
        return new ChallengeApi().getAll().then(challenges => {
            dispatch(addChallenges(challenges));
        });
    };
}

export function addChallenges(challenges) {
    return {type: types.ADD_CHALLENGES, challenges};
}

export function joinChallenge(challengeId) {
    return function (dispatch) {
        return new ChallengeApi().addAthlete(challengeId).then(athlete => {
            dispatch(addChallengeAthletes(challengeId, [athlete]));
        });
    };
}

export function getChallengeAthletes(id) {
    return function (dispatch) {
        return new ChallengeApi().getAthletes(id).then(athletes => {
            dispatch(addChallengeAthletes(id, athletes));
        });
    };
}

export function addChallengeAthletes(challengeId, athletes) {
    return {type: types.ADD_CHALLENGE_ATHLETES, challengeId, athletes};
}
