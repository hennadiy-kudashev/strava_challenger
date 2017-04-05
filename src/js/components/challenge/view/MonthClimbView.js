import React, {PropTypes} from "react";
import MonthView from './MonthView';

const MonthClimbView = ({challenge}) => {
    return (
        <MonthView challenge={challenge} criterion="total_elevation_gain"/>
    );
};

MonthClimbView.propTypes = {
    challenge: PropTypes.object.isRequired,
    criterion: PropTypes.string.isRequired
};

export default MonthClimbView;
