import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../../actions/challengeActions";
import EditForm from "./EditForm";
import Spinner from "../../shared/Spinner";
import {browserHistory} from "react-router";

class EditPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            challenge: this.props.challenge
        };
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenge: Object.assign({}, nextProps.challenge)});
    }

    onSave(e) {
        e.preventDefault();
        const {challenge} = this.state;
        this.props.actions.editChallenge(challenge).then(()=> {
            browserHistory.push('/challenge/' + challenge.id);
        });
    }

    onChange(state) {
        const {challenge} = this.state;
        this.setState({challenge: Object.assign({}, challenge, state)});
    }

    render() {
        const {challenge} = this.state;
        if (!challenge) {
            return (<Spinner/>);
        }

        return (<EditForm operation="Edit" challenge={challenge} onChange={this.onChange} onSave={this.onSave}/>);
    }
}

EditPage.propTypes = {
    user: PropTypes.object,
    challenge: PropTypes.object,
    actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    const challengeID = ownProps.params.id;
    if (challengeID && state.challenges.length > 0) {
        return {
            user: state.auth.user,
            challenge: state.challenges.find(t=>t.id === challengeID)
        };
    }
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);