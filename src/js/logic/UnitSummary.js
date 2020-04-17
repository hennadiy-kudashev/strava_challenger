import TotalSummary from "./totalSummary";
import PeriodSummary from "./periodSummary";
import BY from "../components/challenge/view/thresholdBy";

class UnitSummary {
  constructor(start, end, threshold, by) {
    this.start = start;
    this.end = end;
    this.threshold = threshold;
    this.by = by;
  }

  getPeriods() {
    throw "This method should be implemented";
    //[{start: moment, end: moment, label: ''}, ...]
  }

  getPeriodLabels() {
    return this.getPeriods().map(m => m.label);
  }

  getPeriodNorm(period) {
    const periodSummary = new PeriodSummary(period.start, period.end);
    if (periodSummary.isEnded()) {
      return this.getDayNorm() * periodSummary.getDays();
    }
    if (periodSummary.isNotStarted()) {
      return 0;
    }
    if (periodSummary.isBetween()) {
      return this.getDayNorm() * periodSummary.getDaysPast();
    }
  }

  getPeriodDiff(activities, criterion) {
    return this.getPeriods()
      .map(period => {
        const totalSummary = TotalSummary.create(activities, period.start, period.end);
        const total = totalSummary.getByCriterion(criterion);
        const norm = this.getPeriodNorm(period);
        const periodSummary = new PeriodSummary(period.start, period.end);
        return {
          monthTotal: total,
          monthDiff: total - norm,
          monthNorm: norm,
          activitiesCount: totalSummary.getRunCount(),
          label: period.label,
          summary: periodSummary.getSummary()
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

  getPeriodsNorm() {
    return this.getPeriods().map(period => {
      return this.getPeriodNorm(period);
    });
  }

  getNormByNow() {
    return this.getPeriodsNorm().reduce((a, b) => a + b, 0);
  }

  getDayNorm() {
    if (this.by === BY.TOTAL) {
      const days = new PeriodSummary(this.start, this.end).getDays();
      return this.threshold / days;
    } else if (this.by === BY.WEEK) {
      return this.threshold / 7;
    } else if (this.by === BY.MONTH) {
      return this.threshold / 30;
    } else {
      throw 'unsupported by type: ' + this.by;
    }
  }
}

export default UnitSummary;
