import * as types from './actionTypes';
import OauthApi from '../api/oauthApi';
import AthleteApi from '../api/athleteApi';
import accessTokenStorage from "../api/accessTokenStorage";

export function getAccessToken(code) {
    return function (dispatch) {
        return new OauthApi().getToken(code).then(data=> {
            accessTokenStorage.set(data.access_token);
            dispatch(setIsAuthenticated(true));
            dispatch(setAuthUser(data.athlete));
        });
    };
}

export function setIsAuthenticated(isAuthenticated) {
    return {type: types.SET_IS_AUTHENTICATED, isAuthenticated};
}

export function getAuthUser() {
    return function (dispatch) {
        return new AthleteApi().getAuthAthlete().then(data=> {
            dispatch(setAuthUser(data));
        });
    };
}

export function setAuthUser(user) {
    return {type: types.SET_AUTH_USER, user};
}
