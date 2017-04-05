import React, {PropTypes} from "react";
import MonthView from './MonthView';

const MonthDistanceView = ({challenge}) => {
    return (
        <MonthView challenge={challenge} criterion="distance"/>
    );
};

MonthDistanceView.propTypes = {
    challenge: PropTypes.object.isRequired,
    criterion: PropTypes.string.isRequired
};

export default MonthDistanceView;