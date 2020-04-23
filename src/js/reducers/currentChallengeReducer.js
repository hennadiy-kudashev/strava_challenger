import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import athletesReducer from '../reducers/athletesReducer';

export default function currentChallengeReducer(state = {}, action) {
    switch (action.type) {
        case types.ADD_CHALLENGE_ATHLETES:
        case types.REMOVE_CHALLENGE_ATHLETES:
            return Object.assign({}, state, {
                athletes: athletesReducer(state.athletes, action)
            });
        default:
            return state;
    }
}
