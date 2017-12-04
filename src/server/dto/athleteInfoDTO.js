
module.exports.create = function ({ id,  profile, firstname, lastname, city, state, country}) {
  return {
      id,
      profile,
      firstname,
      lastname,
      city,
      state,
      country
  };
};