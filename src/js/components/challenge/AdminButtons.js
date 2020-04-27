import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {Button} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as challengeActions from "../../actions/challengeActions";
import Prompt from "../shared/Prompt";

class AdminButtons extends React.Component {
    constructor(props) {
        super(props);
        this.removeChallenge = this.removeChallenge.bind(this);
    }

    removeChallenge(e) {
        e.preventDefault();
        const {challenge, actions} = this.props;
        actions.removeChallenge(challenge._id).then(()=>{
            browserHistory.push('/dashboard');
        });
    }

    render() {
        const { challenge} = this.props;
        if (!challenge.canEdit){
            return null;
        }
        return (<div>
            <Prompt text="Are you sure you want to remove challenge?" confirm={this.removeChallenge}>
                <Button type="button" bsClass="btn btn-default pull-right">Remove</Button>
            </Prompt>
            <Link className="btn btn-default pull-right" to={"/challenge/edit/"+ challenge._id}>Edit</Link>
        </div>);
    }
}

AdminButtons.propTypes = {
    challenge: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(AdminButtons);
