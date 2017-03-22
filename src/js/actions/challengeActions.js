import * as types from "./actionTypes";
import AthleteApi from "../api/athleteApi";
import ChallengeApi from "../api/challengeApi";

export function createChallenge(challenge) {
    return {type: types.CREATE_CHALLENGE, challenge};
}

export function getChallenges() {
    return function (dispatch) {
        return new ChallengeApi().getAll().then(challenges => {
            dispatch(setChallenges(challenges));
        });
    };
}

export function setChallenges(challenges) {
    return {type: types.SET_CHALLENGES, challenges};
}

export function followChallenge(challengeId, athlete) {
    return {type: types.FOLLOW_CHALLENGE, challengeId, athlete};
}

export function getChallenge(id, athletes, criteria) {
    return function (dispatch) {
        return Promise.all([
            Promise.all(athletes.map(athlete=>new AthleteApi().getInfo(athlete.id))),
            Promise.all(athletes.map(athlete=>new AthleteApi(athlete.token).getActivities(
                new Date(criteria.datetime.after),
                new Date(criteria.datetime.before))))
        ]).then(values=> {
            console.log(values);
            const infoList = values[0];
            const activitiesList = values[1];
            dispatch(setChallenge(id, infoList, activitiesList));
        });
    };
}

export function setChallenge(challengeId, infoList, activitiesList) {
    return {type: types.SET_CHALLENGE, challengeId, infoList, activitiesList};
}
