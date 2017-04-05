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
            .includes(JSON.stringify(user.id));

        const btn = (<a href="#" onClick={this.joinChallenge} className="btn btn-default pull-right">Join Challenge</a>);
        const btnJoined = (<div className="btn btn-default disabled pull-right">Joined</div>);

        return isJoined ? btnJoined : btn;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.auth.user
    };
}

JoinButton.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);
