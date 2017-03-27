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
        const {user, challenge, actions} = this.props;
        actions.challengeActions.joinChallenge(challenge.id, user);
    }

    render() {
        const {user, challenge} = this.props;
        const isJoined = challenge.athletes
            .map(athlete => athlete.id)
            .includes(user.id);

        const btn = (<a href="#" onClick={this.joinChallenge} className="btn btn-default pull-right">Join Challenge</a>);
        const icon = (<i className="fa fa-check fa-2x pull-right text-green"></i>);

        return isJoined ? icon : btn;
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
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(JoinButton);
