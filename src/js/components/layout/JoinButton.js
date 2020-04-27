import React, { PropTypes } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Prompt from "../shared/Prompt";
import * as challengeActions from "../../actions/challengeActions";

class JoinButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.joinChallenge = this.joinChallenge.bind(this);
    this.leaveChallenge = this.leaveChallenge.bind(this);
  }

  joinChallenge(e) {
    e.preventDefault();
    const { challenge, actions } = this.props;
    actions.challengeActions.joinChallenge(challenge._id);
  }

  leaveChallenge(e) {
    e.preventDefault();
    const { challenge, actions } = this.props;
    actions.challengeActions.leaveChallenge(challenge._id);
  }

  render() {
    const { challenge } = this.props;
    if (challenge.joined) {
      return (
        <Prompt text="Are you sure you want to leave this challenge?" confirm={this.leaveChallenge}>
          <button className="btn btn-default pull-right">Leave Challenge</button>
        </Prompt>
      );
    } else {
      return (<button onClick={this.joinChallenge} className="btn btn-default pull-right">Join Challenge</button>);
    }
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
