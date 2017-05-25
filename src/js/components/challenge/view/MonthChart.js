import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthSummary from "../../../logic/monthSummary";
import {Line} from "react-chartjs";
import thresholds from './thresholds';
import BaseView from './BaseView';

class MonthChart extends BaseView{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        const monthSummary = new MonthSummary(
            this.getChallenge().criteria.datetime.after,
            this.getChallenge().criteria.datetime.before,
            this.getChallenge().criteria.threshold[this.getThresholdCriterion()]);

        const threshold = thresholds[this.getThresholdCriterion()];
        const columns = ['Athlete', threshold.label];
        const rows = this.getSortedAthletes().map((athlete, indexA)=> {
            const data = {
                labels: monthSummary.getMonths(),
                datasets: [
                    {
                        label: `Norm, ${threshold.unit}`,
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: monthSummary.getMonthsDiff(athlete.activities, this.getThresholdCriterion()).map(t=> threshold.convert(t.monthNorm))
                    },
                    {
                        label: `Actual, ${threshold.unit}`,
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: monthSummary.getMonthsDiff(athlete.activities, this.getThresholdCriterion()).map(t=> threshold.convert(t.monthTotal))
                    }
                ]
            };
            return [
                <UserInfo key={indexA} userInfo={athlete.userInfo}/>,
                <Line key={indexA} data={data} width="800" height="200"/>
            ];
        });
        return (
            <Table columns={columns} rows={rows}/>
        );
    }
}

export default MonthChart;