import React, { PropTypes } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
      return (<button onClick={this.leaveChallenge} className="btn btn-default pull-right">Leave Challenge</button>);
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
