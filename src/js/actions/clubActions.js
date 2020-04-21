import * as types from "./actionTypes";
import ClubApi from "../api/clubApi";

export function getAthleteClubs() {
  return function (dispatch) {
    return new ClubApi().getAthleteClubs().then(clubs => {
      dispatch({ type: types.GET_ATHLETE_CLUBS, data: clubs });
    });
  };
}
