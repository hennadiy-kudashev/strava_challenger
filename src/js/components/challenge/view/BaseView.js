import React, {PropTypes} from "react";
import Sorter from "../../../logic/sorter";

class BaseView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    getChallenge(){
        return this.props.challenge;
    }

    getThresholdCriterion(){
        return Object.keys(this.getChallenge().criteria.threshold)[0];
    }

    getSortedAthletes() {
        const sorter = new Sorter(this.getThresholdCriterion());
        return this.getChallenge().athletes.sort(sorter.getSortFn());
    }
}

BaseView.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default BaseView;