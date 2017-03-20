import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class ChallengePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(next){
        console.log(next.challenge);
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

export default connect(mapStateToProps)(ChallengePage);