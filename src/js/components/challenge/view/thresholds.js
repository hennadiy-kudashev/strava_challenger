import { Kilometre, Metre, Time } from './format';

//name are the same as activity props
export const THRESHOLD_CRITERION = {
  DISTANCE: 'distance',
  EVAL_GAIN: 'total_elevation_gain',
  TIME: 'moving_time'
};

const thresholds = {
  [THRESHOLD_CRITERION.DISTANCE]: {
    label: 'Distance',
    component: Kilometre,
    unit: 'km',
    toDisplayUnit: metre => Math.round(metre / 1000),//metre->km
    toActivityUnit: km => km * 1000, //km->metre
  },
  [THRESHOLD_CRITERION.EVAL_GAIN]: {
    label: 'Climb',
    component: Metre,
    unit: 'm',
    toDisplayUnit: metre => Math.round(metre),//metre->metre
    toActivityUnit: metre => metre,//metre->metre
  },
  [THRESHOLD_CRITERION.TIME]: {
    label: 'Time',
    component: Time,
    unit: 'min',
    toDisplayUnit: seconds => Math.round(seconds / 60),//sec->min
    toActivityUnit: min => min * 60,//min->sec
  }
};

export default thresholds;
