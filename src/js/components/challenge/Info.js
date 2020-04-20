import React, { PropTypes } from 'react';
import moment from "moment";
import thresholds from './view/thresholds';
import thresholdBYs from './view/thresholdBYs';

const Info = ({ challenge }) => {
  const period = challenge.criteria.datetime;
  const thresholdCriteria = Object.keys(challenge.criteria.threshold)[0];
  const threshold = challenge.criteria.threshold[thresholdCriteria];
  const thresholdItem = thresholds[thresholdCriteria];
  const activityType = challenge.criteria.types.join(', ');
  const by = thresholdBYs[challenge.criteria.threshold.by];
  const minActivities = challenge.criteria.minActivities.value;
  const minActivitiesBy = thresholdBYs[challenge.criteria.minActivities.by];
  const activityLength = challenge.criteria.activityLength.value;
  const activityLengthCriterion = thresholds[challenge.criteria.activityLength.criterion];
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
      {minActivities > 0 && <dt>Minimal Activities</dt>}
      {minActivities > 0 && <dd>{minActivities} ({minActivitiesBy.label})</dd>}
      {activityLength > 0 && <dt>Min activity length ({activityLengthCriterion.label})</dt>}
      {activityLength > 0 &&
      <dd>{activityLengthCriterion.toDisplayUnit(activityLength)} {activityLengthCriterion.unit}</dd>}
    </dl>
  );
};

Info.propTypes = {
  challenge: PropTypes.object.isRequired
};

export default Info;
