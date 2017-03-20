import * as types from './actionTypes';

export function setError(error){
    return { type: types.SET_ERROR, error};
}

export function removeError(error){
    return { type: types.REMOVE_ERROR, error};
}