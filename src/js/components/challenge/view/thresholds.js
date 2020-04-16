import { Kilometre, Metre, Time } from './format';

const thresholds = {
  distance: {
    label: 'Distance',
    component: Kilometre,
    unit: 'km',
    toDisplayUnit: metre => Math.round(metre / 1000),//metre->km
    toActivityUnit: km => km * 1000, //km->metre
  },
  total_elevation_gain: {
    label: 'Climb',
    component: Metre,
    unit: 'm',
    toDisplayUnit: metre => Math.round(metre),//metre->metre
    toActivityUnit: metre => metre,//metre->metre
  },
  moving_time: {
    label: 'Time',
    component: Time,
    unit: 'min',
    toDisplayUnit: seconds => Math.round(seconds / 60),//sec->min
    toActivityUnit: min => min * 60,//min->sec
  }
};

export default thresholds;
