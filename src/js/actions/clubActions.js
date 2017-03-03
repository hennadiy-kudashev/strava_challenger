import * as types from './actionTypes';

export function clubMembersReceived(members) {
    return { type: types.CLUB_MEMBERS_RECEIVED, members};
}

