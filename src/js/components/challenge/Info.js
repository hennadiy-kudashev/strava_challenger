import React, {PropTypes} from 'react';
import moment from "moment";
import thresholds from './view/thresholds';

const Info = ({challenge}) => {
    const period = challenge.criteria.datetime;
    const thresholdCriteria = Object.keys(challenge.criteria.threshold)[0];
    const threshold = challenge.criteria.threshold[thresholdCriteria];
    const thresholdItem = thresholds[thresholdCriteria];
    return (
        <dl className="dl-horizontal">
            <dt>Description</dt>
            <dd>{challenge.description}</dd>
            <dt>Start</dt>
            <dd>{moment(period.after).format('MMM Do YYYY, h:mm:ss a')}</dd>
            <dt>End</dt>
            <dd>{moment(period.before).format('MMM Do YYYY, h:mm:ss a')}</dd>
            <dt>Participants</dt>
            <dd>{challenge.athletes.length}</dd>
            <dt>Threshold {thresholdItem.label}</dt>
            <dd>{thresholdItem.convert(threshold)} {thresholdItem.unit}</dd>
        </dl>
    );
};

Info.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default Info;