import React from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import { Line } from "react-chartjs";
import thresholds from './thresholds';
import BaseView from './BaseView';
import { groupBy } from "./activityTypes";
import Checkbox from "react-bootstrap/lib/Checkbox";

const activityTypeColors = [
  (alpha) => `rgba(252, 76, 2, ${alpha})`,
  (alpha) => `rgba(239, 34, 94, ${alpha})`,
  (alpha) => `rgba(188, 58, 140, ${alpha})`,
  (alpha) => `rgba(117, 79, 152, ${alpha})`,
  (alpha) => `rgba(59, 82, 128, ${alpha})`,
  (alpha) => `rgba(47, 72, 88, ${alpha})`,
];

/*const activityTypeColors = [
  (alpha) => `rgba(126, 206, 217, ${alpha})`,
  (alpha) => `rgba(111, 224, 210, ${alpha})`,
  (alpha) => `rgba(133, 238, 184, ${alpha})`,
  (alpha) => `rgba(184, 247, 147, ${alpha})`,
  (alpha) => `rgba(249, 248, 113, ${alpha})`,
];*/

const getActivityTypeColors = (index) => {
  if (index >= activityTypeColors.length) {
    return getActivityTypeColors(index - activityTypeColors.length);
  }
  return activityTypeColors[index];
};

class UnitChart extends BaseView {
  constructor(props, context, unitClass) {
    super(props, context);
    this.unitClass = unitClass;
    this.state = {
      showActivityTypes: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      showActivityTypes: e.target.checked
    });
  }

  render() {
    const { showActivityTypes } = this.state;
    const unitSummary = new this.unitClass(
      this.getChallenge().criteria.datetime.after,
      this.getChallenge().criteria.datetime.before,
      this.getChallenge().criteria.threshold[this.getThresholdCriterion()],
      this.getChallenge().criteria.threshold.by,
      this.getChallenge().criteria.minActivities,
    );

    const threshold = thresholds[this.getThresholdCriterion()];
    const columns = ['Athlete', threshold.label];
    const rows = this.getSortedAthletes().map((athlete, indexA) => {
      const grouped = groupBy(athlete.activities, 'type');
      const data = {
        labels: unitSummary.getPeriodLabels(),
        datasets: [
          {
            label: `Norm, ${threshold.unit}`,
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: unitSummary.getPeriodDiff(athlete.activities, this.getThresholdCriterion()).map(t => threshold.toDisplayUnit(t.monthNorm))
          },
          {
            label: `Actual, ${threshold.unit}`,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: unitSummary.getPeriodDiff(athlete.activities, this.getThresholdCriterion()).map(t => threshold.toDisplayUnit(t.monthTotal))
          },
          ...(showActivityTypes ? Object.keys(grouped).map((key, index) => (
            {
              label: `${key}, ${threshold.unit}`,
              fillColor: getActivityTypeColors(index)(0.2),
              strokeColor: getActivityTypeColors(index)(1),
              pointColor: getActivityTypeColors(index)(1),
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: getActivityTypeColors(index)(1),
              data: unitSummary.getPeriodDiff(grouped[key], this.getThresholdCriterion()).map(t => threshold.toDisplayUnit(t.monthTotal))
            }
          )) : [])
        ]
      };
      return [
        <UserInfo key={`user_${indexA}`} userInfo={athlete.info}/>,
        //set key in order to rerender chart when data is changed
        <Line key={JSON.stringify(data).length} data={data} width="800" height="200"/>
      ];
    });
    const activityTypes = this.getChallenge().criteria.types;
    return (
      <div>
        {(activityTypes.length === 0 || activityTypes.length > 1) &&
        <Checkbox checked={showActivityTypes} onChange={this.handleChange}>Show activity types on chart</Checkbox>}
        <Table columns={columns} rows={rows}/>
      </div>
    );
  }
}

export default UnitChart;
