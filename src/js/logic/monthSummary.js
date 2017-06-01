import moment from "moment";
import TotalSummary from "./totalSummary";
import PeriodSummary from "./periodSummary";

class MonthSummary {
    constructor(start, end, threshold) {
        this.start = start;
        this.end = end;
        this.threshold = threshold;
    }

    _getMonths() {
        const self = this;
        let dateStart = moment(this.start);
        let dateEnd = moment(this.end);
        let months = [];

        while (dateEnd > dateStart) {
            months.push({
                start: dateStart.clone().startOf('month'),
                end: dateStart.clone().endOf('month'),
                label: dateStart.format('MMMM'),
                getNorm: function () {
                    const periodSummary = new PeriodSummary(this.start, this.end);
                    if (periodSummary.isEnded()) {
                        return self.getDayNorm() * periodSummary.getDays();
                    }
                    if (periodSummary.isNotStarted()) {
                        return 0;
                    }
                    if (periodSummary.isBetween()) {
                        return self.getDayNorm() * periodSummary.getDaysPast();
                    }
                }
            });
            dateStart.add(1, 'month');
        }
        return months;
    }

    getMonths() {
        return this._getMonths().map(m=>m.label);
    }

    getMonthsDiff(activities, criterion) {
        return this._getMonths()
            .map(month=> {
                const total = TotalSummary.create(activities, month.start, month.end).getByCriterion(criterion);
                const norm = month.getNorm();
                return {
                    monthTotal: total,
                    monthDiff: total - norm,
                    monthNorm: norm
                };
            });
    }

    getTotal(activities, criterion) {
        const total = TotalSummary.create(activities, this.start, this.end).getByCriterion(criterion);
        return {
            total: total,
            diff: total - this.getNormByNow()
        };
    }

    getMonthsNorm() {
        return this._getMonths().map(month=> {
            return month.getNorm();
        });
    }

    getNormByNow() {
        return this.getMonthsNorm().reduce((a, b) => a + b, 0);
    }

    getDayNorm() {
        const days = new PeriodSummary(this.start, this.end).getDays();
        return this.threshold / days;
    }
}

export default MonthSummary;