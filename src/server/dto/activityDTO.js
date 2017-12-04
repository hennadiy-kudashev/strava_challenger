module.exports.create = function ({distance, moving_time, total_elevation_gain, start_date}) {
  return {
      distance,
      moving_time,
      total_elevation_gain,
      start_date
  };
};