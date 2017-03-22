import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import athletesReducer from '../reducers/athletesReducer';

export default function currentChallengeReducer(state = {}, action) {
    switch (action.type) {
        case types.FOLLOW_CHALLENGE:
            return state;
        case types.SET_CHALLENGE:
            return Object.assign({}, state, {
                athletes: athletesReducer(state.athletes, action),
                isLoaded:true
            });
        default:
            return state;
    }
}
