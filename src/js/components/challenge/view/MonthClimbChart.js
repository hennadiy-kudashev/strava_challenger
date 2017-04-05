import React, {PropTypes} from "react";
import MonthChart from "./MonthChart";

const MonthClimbChart = ({challenge}) => {
    return (
        <MonthChart challenge={challenge} criterion="total_elevation_gain"/>
    );
};

MonthClimbChart.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default MonthClimbChart;