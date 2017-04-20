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

export function joinChallenge(challengeId, athlete, activitiesList) {
    return function (dispatch) {
        return new ChallengeApi().addAthlete(challengeId, {
            id: athlete.id,
            token: athlete.token
        }).then(() => {
            dispatch({type: types.JOIN_CHALLENGE, challengeId, athlete, activitiesList});
        });
    };
}

export function getJoinedAthlete(challengeId, criteria, athlete) {
    return function (dispatch) {
        new AthleteApi(athlete.token).getActivities(
            new Date(criteria.datetime.after),
            new Date(criteria.datetime.before)
        ).then(activities => {
            dispatch(joinChallenge(challengeId, athlete, activities));
        });
    };
}

export function getChallenge(id, athletes, criteria) {
    return function (dispatch) {
        return Promise.all([
            Promise.all(athletes.map(athlete=>new AthleteApi().getInfo(athlete.id))),
            Promise.all(athletes.map(athlete=>new AthleteApi(athlete.token).getActivities(
                new Date(criteria.datetime.after),
                new Date(criteria.datetime.before))))
        ]).then(values=> {
            const infoList = values[0];
            const activitiesList = values[1];
            dispatch(setChallenge(id, infoList, activitiesList));
        });
    };
}

export function setChallenge(challengeId, infoList, activitiesList) {
    return {type: types.SET_CHALLENGE, challengeId, infoList, activitiesList};
}
