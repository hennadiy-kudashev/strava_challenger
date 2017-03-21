import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import _ from 'lodash';

class ChallengePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(next){
        const {challenge, actions} = next;

        challenge.athletes.forEach((athlete) => {
            if (_.isEmpty(athlete.userInfo)) {
                actions.challengeActions.getChallengeAthleteInfo(challenge.id, athlete);
            }

            if (_.isEmpty(athlete.activities)) {
                actions.challengeActions.getChallengeAthleteActivities(challenge.id, athlete);
            }
        });
    }

    render() {
        const {challenge} = this.props;
        if (!challenge) {
            return (
                <div>Select challenge.</div>
            );
        } else {
            return (
                <div>Challenge: {challenge.displayName}</div>
            );
        }
    }
}

ChallengePage.propTypes = {
    challenge: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let challengeID = ownProps.params.id;
    let challenge;
    if (challengeID && state.challenges.length > 0) {
        challenge = state.challenges.find(t => t.id === challengeID);
    }
    return {
        challenge: challenge
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
