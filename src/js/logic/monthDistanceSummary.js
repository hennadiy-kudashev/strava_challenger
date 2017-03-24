import moment from "moment";
import TotalSummary from "./totalSummary";

class MonthDistanceSummary {
    constructor(start, end, threshold) {
        this.start = start;
        this.end = end;
        this.threshold = threshold;
    }

    _getMonths() {
        let dateStart = moment(this.start);
        let dateEnd = moment(this.end);
        let months = [];

        while (dateEnd > dateStart) {
            months.push({
                start: dateStart.clone().startOf('month'),
                end: dateStart.clone().endOf('month'),
                label: dateStart.format('MMMM')
            });
            dateStart.add(1, 'month');
        }
        return months;
    }

    getMonths() {
        return this._getMonths().map(m=>m.label);
    }

    getMonthsDistance(activities) {
        const months = this._getMonths();
        const monthDistance = this.threshold / months.length;
        return months
            .map(month=> {
                return TotalSummary.create(activities, month.start, month.end).getDistance();
            })
            .map(distance=> {
                return {
                    distance,
                    diff: distance - monthDistance,
                    monthDistance
                };
            });
    }

    getTotalDistance(activities){
        const distance = TotalSummary.create(activities, this.start, this.end).getDistance();
        return {
            distance,
                diff: distance - this.threshold
        };
    }
}

export default MonthDistanceSummary;