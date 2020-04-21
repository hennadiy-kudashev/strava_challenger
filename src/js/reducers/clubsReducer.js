import * as types from "../actions/actionTypes";

export default function clubsReducer(state = null, action) {
  switch (action.type) {
    case types.GET_ATHLETE_CLUBS:
      return [...(state || []), ...action.data];
    default:
      return state;
  }
}
