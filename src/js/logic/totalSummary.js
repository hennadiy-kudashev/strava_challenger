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

    getByCriterion(criterion){
        let total = 0;
        this.activities.forEach(a=> total += a[criterion]);
        return total;
    }

    getDistance() {
        return this.getByCriterion('distance');
    }

    getElevGain() {
        return this.getByCriterion('total_elevation_gain');
    }

    getTime() {
        return this.getByCriterion('moving_time');
    }
}

export default TotalSummary;
