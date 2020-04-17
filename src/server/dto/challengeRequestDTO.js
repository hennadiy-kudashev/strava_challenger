
module.exports.create = function (athleteID, { description, displayName, criteria, views, 'private': _private}) {
  return {
      description,
      displayName,
      criteria,
      views,
      createdBy: athleteID,
      private: _private
  };
};
