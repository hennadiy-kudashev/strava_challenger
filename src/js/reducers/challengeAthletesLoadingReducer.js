import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function (state = initialState.challengeAthletesLoading, action) {
  switch (action.type) {
    case types.GET_CHALLENGE_ATHLETES_LOADING:
      return true;
    case types.ADD_CHALLENGE_ATHLETES:
      return false;
    default:
      return state;
  }
}
