import * as types from './actionTypes';

export function setChallenge(challenge) {
    return { type: types.SET_CHALLENGE, challenge};
}

export function followChallenge(challengeId, athlete) {
    return { type: types.FOLLOW_CHALLENGE, challengeId, athlete};
}
