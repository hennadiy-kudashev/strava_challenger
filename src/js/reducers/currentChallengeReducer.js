import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import athletesReducer from '../reducers/athletesReducer';

export default function currentChallengeReducer(state = {}, action) {
    switch (action.type) {
        case types.SET_CHALLENGE:
            return Object.assign({}, state, {
                athletes: athletesReducer(state.athletes, action),
                isLoaded:true
            });
        case types.JOIN_CHALLENGE:
          return Object.assign({}, state, {
                athletes: athletesReducer(state.athletes, action)
          });
        default:
            return state;
    }
}
