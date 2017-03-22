import moment from "moment";

class TotalSummary {
    constructor(activities) {
        this.activities = activities;
    }

    static create(activities, start, end) {
        return new this(activities.filter(activity=>moment(activity.start_date).isBetween(moment(start), moment(end))));
    }

    getRunCount() {
        return this.activities.length;
    }

    getDistance() {
        let distance = 0;
        this.activities.forEach(a=> distance += a.distance);
        return distance;
    }

    getElevGain() {
        let elevGain = 0;
        this.activities.forEach(a=> elevGain += a.total_elevation_gain);
        return elevGain;
    }

    getTime() {
        let time = 0;
        this.activities.forEach(a=> time += a.moving_time);
        return time;
    }
}

export default TotalSummary;