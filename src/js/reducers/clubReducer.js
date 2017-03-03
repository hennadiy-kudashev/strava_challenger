import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function clubReducer(state = initialState.club, action) {
    switch (action.type) {
        case types.CLUB_MEMBERS_RECEIVED:
            return { members: action.members};
        default:
            return state;
    }
}
