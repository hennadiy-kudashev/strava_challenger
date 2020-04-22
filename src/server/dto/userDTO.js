const { canCreateChallenge } = require('../lib/admin');

module.exports.create = function ({_id, id, profile, firstname, lastname}) {
  return {
      _id,
      id,
      profile,
      firstname,
      lastname,
      isAdmin: canCreateChallenge(id)
  };
};
