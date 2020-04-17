module.exports.create = function (athleteID, {_id, description, displayName, criteria, views, athletes = [], createdBy, 'private': _private}) {
    //to filter out private challenges requested by other user.
    if (_private && createdBy !== athleteID){
        return null;
    }
    return {
        _id,
        description,
        displayName,
        criteria,
        views,
        joined: athletes.some(athlete=> athlete.id === athleteID),
        canEdit: createdBy === athleteID,
        private: _private
    };
};
