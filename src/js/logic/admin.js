const adminId = process.env.ADMIN_STRAVA_ATHLETE_ID;

export function canCreateChallenge(userId) {
    if (adminId){
        return userId.toString() === adminId.toString();
    } else {
        return true;
    }
}
