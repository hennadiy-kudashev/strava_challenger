import * as types from './actionTypes';
import ClubApi from '../api/clubApi';

export function getClubMembers() {
    return function (dispatch) {
        let clubApi = ClubApi.createURunClub();
        return clubApi.getMembers().then(members=> {
            dispatch(setClubMembers(members));
        });
    };
}

export function setClubMembers(members) {
    return { type: types.SET_CLUB_MEMBERS, members};
}

