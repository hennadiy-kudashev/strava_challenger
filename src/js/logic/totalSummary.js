class TotalSummary {
    constructor(activities) {
        this.activities = activities.filter(a=> a.type == 'Run');
    }

    getRunCount() {
        return this.activities.length;
    }

    getDistance() {
        let distance = 0;
        this.activities.forEach(a=> distance += a.distance);
        return `${Math.round(distance / 1000)} km`;
    }

    getElevGain() {
        let elevGain = 0;
        this.activities.forEach(a=> elevGain += a.total_elevation_gain);
        return `${Math.round(elevGain)} m`;
    }

    getTime(){
        let time = 0;
        this.activities.forEach(a=> time += a.moving_time);
        const hr  = Math.floor(time / 3600);
        const min = Math.floor((time - (hr * 3600))/60);
        return `${hr}h ${min}m`;
    }
}

export default TotalSummary;