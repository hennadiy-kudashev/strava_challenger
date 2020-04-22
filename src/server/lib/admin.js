module.exports.canCreateChallenge = function(userId) {
    const adminId = process.env.ADMIN_STRAVA_ATHLETE_ID;
    if (adminId){
        return userId.toString() === adminId.toString();
    } else {
        return true;
    }
};
