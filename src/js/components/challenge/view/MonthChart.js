import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthSummary from "../../../logic/monthSummary";
import {Line} from "react-chartjs";
import thresholds from './thresholds';

const MonthChart = ({challenge, criterion}) => {
    const monthSummary = new MonthSummary(
        challenge.criteria.datetime.after,
        challenge.criteria.datetime.before,
        challenge.criteria.threshold[criterion]);

    const threshold = thresholds[criterion];
    const columns = ['Athlete', threshold.label];
    const rows = challenge.athletes.map((athlete, indexA)=> {
        const data = {
            labels: monthSummary.getMonths(),
            datasets: [
                {
                    label: `Expected, ${threshold.unit}`,
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: monthSummary.getMonthsDiff(athlete.activities, criterion).map(t=> threshold.convert(t.monthThreshold))
                },
                {
                    label: `Actual, ${threshold.unit}`,
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: monthSummary.getMonthsDiff(athlete.activities, criterion).map(t=> threshold.convert(t.monthTotal))
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
};

MonthChart.propTypes = {
    challenge: PropTypes.object.isRequired,
    criterion: PropTypes.string.isRequired
};

export default MonthChart;