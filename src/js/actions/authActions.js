import * as types from './actionTypes';
import OauthApi from '../api/oauthApi';
import AthleteApi from '../api/athleteApi';
import accessTokenStorage from "../api/accessTokenStorage";


export function getAccessToken(code) {
    return function (dispatch) {
        return new OauthApi().getToken(code).then(data=> {
            accessTokenStorage.set(data.access_token);
            dispatch(setIsAuthenticated(true, '/dashboard'));
            // debugger;
            dispatch(setAuthUser(data.athlete, data.access_token));
        });
    };
}

export function logout() {
    return function (dispatch) {
        accessTokenStorage.remove();
        dispatch(setIsAuthenticated(false, '/'));
        dispatch(setAuthUser({}));
    };
}


export function setIsAuthenticated(isAuthenticated, path) {
    return {type: types.SET_IS_AUTHENTICATED, isAuthenticated, path};
}

export function getAuthUser() {
    return function (dispatch) {
        return new AthleteApi().getAuthAthlete().then(data=> {
            dispatch(setAuthUser(data));
        });
    };
}

export function setAuthUser(user, token) {
    return {type: types.SET_AUTH_USER, user, token};
}
