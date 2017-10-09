import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {Button} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as challengeActions from "../../actions/challengeActions";

class AdminButtons extends React.Component {
    constructor(props, context) {
        super(props);
        this.removeChallenge = this.removeChallenge.bind(this);
    }

    removeChallenge(e) {
        e.preventDefault();
        const {challenge, actions} = this.props;
        actions.removeChallenge(challenge.id).then(()=>{
            browserHistory.push('/dashboard');
        });
    }

    render() {
        const {user, challenge} = this.props;
        if (challenge.createdBy !== user.id){
            return null;
        }
        return (<div>
            <Button type="button" bsClass="btn btn-default pull-right" onClick={this.removeChallenge}>Remove</Button>
            <Link className="btn btn-default pull-right" to={"/challenge/edit/"+ challenge.id}>Edit</Link>
        </div>);
    }
}

AdminButtons.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(AdminButtons);