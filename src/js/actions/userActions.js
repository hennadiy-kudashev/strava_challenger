import * as types from './actionTypes';

export function userReceived(user) {
    return { type: types.USER_RECEIVED, user};
}

