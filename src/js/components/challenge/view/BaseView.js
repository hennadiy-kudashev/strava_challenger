import React, {PropTypes} from "react";
import Sorter from "../../../logic/sorter";
import thresholds from './thresholds';

class BaseView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    getChallenge(){
        return this.props.challenge;
    }

    getUser(){
        return this.props.user;
    }

    getThresholdCriterion(){
        return Object.keys(this.getChallenge().criteria.threshold)[0];
    }

    getThresholdValue(){
        return this.getChallenge().criteria.threshold[this.getThresholdCriterion()];
    }

    getThreshold(){
        return thresholds[this.getThresholdCriterion()];
    }

    getSortedAthletes() {
        const sorter = new Sorter(this.getThresholdCriterion());
        return this.getChallenge().athletes.sort(sorter.getSortFn());
    }
}

BaseView.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default BaseView;
