import React, {PropTypes} from "react";
import MonthChart from "./MonthChart";

const MonthDistanceChart = ({challenge}) => {
    return (
        <MonthChart challenge={challenge} criterion="distance"/>
    );
};

MonthDistanceChart.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default MonthDistanceChart;