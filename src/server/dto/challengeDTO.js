module.exports.create = function (athleteID, { _id, description, displayName, criteria, views, athletes = [], createdBy, 'private': _private, club }) {
  return {
    _id,
    description,
    displayName,
    criteria,
    views,
    joined: athletes.some(athlete => athlete.id === athleteID),
    canEdit: createdBy === athleteID,
    private: _private,
    club
  };
};
