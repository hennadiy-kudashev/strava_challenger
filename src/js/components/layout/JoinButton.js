import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as challengeActions from "../../actions/challengeActions";

class JoinButton extends React.Component {
    constructor(props, context) {
        super(props);
        this.joinChallenge = this.joinChallenge.bind(this);
    }

    joinChallenge(e) {
        e.preventDefault();
        const {challenge, actions} = this.props;
        actions.challengeActions.joinChallenge(challenge._id);
    }

    render() {
        const {challenge} = this.props;
        const btn = (<a href="#" onClick={this.joinChallenge} className="btn btn-default pull-right">Join Challenge</a>);
        const btnJoined = (<div className="btn btn-default disabled pull-right">Joined</div>);

        return challenge.joined ? btnJoined : btn;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

JoinButton.propTypes = {
    challenge: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(JoinButton);
