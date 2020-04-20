module.exports.create = function ({distance, moving_time, total_elevation_gain, start_date, type}) {
  return {
      distance,
      moving_time,
      total_elevation_gain,
      start_date,
      type
  };
};
