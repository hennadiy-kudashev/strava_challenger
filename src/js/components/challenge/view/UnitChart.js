import React from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import { Line } from "react-chartjs";
import thresholds from './thresholds';
import BaseView from './BaseView';

class UnitChart extends BaseView {
  constructor(props, context, unitClass) {
    super(props, context);
    this.unitClass = unitClass;
  }

  render() {
    const unitSummary = new this.unitClass(
      this.getChallenge().criteria.datetime.after,
      this.getChallenge().criteria.datetime.before,
      this.getChallenge().criteria.threshold[this.getThresholdCriterion()]);

    const threshold = thresholds[this.getThresholdCriterion()];
    const columns = ['Athlete', threshold.label];
    const rows = this.getSortedAthletes().map((athlete, indexA) => {
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
          }
        ]
      };
      return [
        <UserInfo key={indexA} userInfo={athlete.info}/>,
        <Line key={indexA} data={data} width="800" height="200"/>
      ];
    });
    return (
      <Table columns={columns} rows={rows}/>
    );
  }
}

export default UnitChart;
