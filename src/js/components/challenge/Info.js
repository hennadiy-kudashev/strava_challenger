import React, {PropTypes} from 'react';
import moment from "moment";
import thresholds from './view/thresholds';
import thresholdBy from './view/thresholdBy';
import thresholdBYs from './view/thresholdBYs';

const Info = ({challenge}) => {
    const period = challenge.criteria.datetime;
    const thresholdCriteria = Object.keys(challenge.criteria.threshold)[0];
    const threshold = challenge.criteria.threshold[thresholdCriteria];
    const thresholdItem = thresholds[thresholdCriteria];
    const activityType = challenge.criteria.types ? challenge.criteria.types.join(', ') : (challenge.criteria.type || 'Run');
    const by = thresholdBYs[challenge.criteria.threshold.by || thresholdBy.TOTAL];
    return (
        <dl className="dl-horizontal">
            <dt>Description</dt>
            <dd>{challenge.description}</dd>
            <dt>Start</dt>
            <dd>{moment(period.after).format('MMM Do YYYY, HH:mm')}</dd>
            <dt>End</dt>
            <dd>{moment(period.before).format('MMM Do YYYY, HH:mm')}</dd>
            <dt>Activity Types</dt>
            <dd>{activityType}</dd>
            <dt>Participants</dt>
            <dd>{challenge.athletes.length}</dd>
            <dt>Threshold {thresholdItem.label}</dt>
            <dd>{thresholdItem.toDisplayUnit(threshold)} {thresholdItem.unit} ({by.label})</dd>
        </dl>
    );
};

Info.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default Info;
