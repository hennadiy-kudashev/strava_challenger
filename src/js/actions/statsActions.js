import * as types from './actionTypes';
import AthleteApi from '../api/athleteApi';

export function getStats(athletes) {
    return function (dispatch) {
        let athletesStats = athletes
            .map(athlete => athlete.id)
            .map(athleteId => new AthleteApi().getStats(athleteId));
        // const hardcodeId = '18192624';
        // let ownStat = new AthleteApi().getStats(hardcodeId);

        return Promise.all(athletesStats).then(stats => {
            dispatch(setStats(stats));
        });
    };
}

export function setStats(stats) {
    return { type: types.SET_STATS, stats};
}


