import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function (state = initialState.challengesLoading, action) {
  switch (action.type) {
    case types.GET_CHALLENGES_LOADING:
      return true;
    case types.GET_CHALLENGES:
      return false;
    default:
      return state;
  }
}
