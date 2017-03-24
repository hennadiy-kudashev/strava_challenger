import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthDistanceSummary from "../../../logic/monthDistanceSummary";
import {Line} from "react-chartjs";

const MonthDistanceChart = ({challenge}) => {
    const monthDistanceSummary = new MonthDistanceSummary(
        challenge.criteria.datetime.after,
        challenge.criteria.datetime.before,
        challenge.criteria.threshold.distance);

    const columns = ['Athlete', 'Distance'];

    const rows = challenge.athletes.map((athlete, indexA)=> {
        const data = {
            labels: monthDistanceSummary.getMonths(),
            datasets: [
                {
                    label: "Expected, km",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: monthDistanceSummary.getMonthsDistance(athlete.activities).map(t=> Math.round(t.monthDistance / 1000))
                },
                {
                    label: "Actual, km",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: monthDistanceSummary.getMonthsDistance(athlete.activities).map(t=> Math.round(t.distance / 1000))
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

MonthDistanceChart.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default MonthDistanceChart;