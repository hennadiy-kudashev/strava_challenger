import TotalSummary from "./totalSummary";
import PeriodSummary from "./periodSummary";
import BY from "../components/challenge/view/thresholdBy";

class UnitSummary {
  constructor(start, end, threshold, by, minActivities) {
    this.start = start;
    this.end = end;
    this.threshold = threshold;
    this.by = by;
    this.minActivities = minActivities;
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
    const dayNorm = this.getDayNormUnit(this.threshold, this.by);
    if (periodSummary.isEnded()) {
      return dayNorm * periodSummary.getDays();
    }
    if (periodSummary.isNotStarted()) {
      return 0;
    }
    if (periodSummary.isBetween()) {
      return dayNorm * periodSummary.getDaysPast();
    }
  }

  getMinActivitiesNorm(period) {
    const periodSummary = new PeriodSummary(period.start, period.end);
    const dayNorm = this.getDayNormUnit(this.minActivities.value, this.minActivities.by);
    if (periodSummary.isEnded()) {
      return Math.round(dayNorm * periodSummary.getDays());
    }
    if (periodSummary.isNotStarted()) {
      return 0;
    }
    if (periodSummary.isBetween()) {
      return Math.floor(dayNorm * periodSummary.getDaysPast());
    }
  }


  getPeriodDiff(activities, criterion) {
    return this.getPeriods()
      .map(period => {
        const totalSummary = TotalSummary.create(activities, period.start, period.end);
        const total = totalSummary.getByCriterion(criterion);
        const norm = this.getPeriodNorm(period);
        const periodSummary = new PeriodSummary(period.start, period.end);
        const activitiesCount = totalSummary.getRunCount();
        const minActivities = this.getMinActivitiesNorm(period);
        return {
          monthTotal: total,
          monthDiff: total - norm,
          monthNorm: norm,
          label: period.label,
          summary: periodSummary.getSummary(),
          activitiesCount,
          minActivities,
          isFailed: periodSummary.isEnded() ? !(total >= norm && activitiesCount >= minActivities) : false
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

  getDayNormUnit(value, by) {
    if (by === BY.TOTAL) {
      const days = new PeriodSummary(this.start, this.end).getDays();
      return value / days;
    } else if (by === BY.WEEK) {
      return value / 7;
    } else if (by === BY.MONTH) {
      return value / 30;
    } else {
      throw 'unsupported by type: ' + this.by;
    }
  }
}

export default UnitSummary;
