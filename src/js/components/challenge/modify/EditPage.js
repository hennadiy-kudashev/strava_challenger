import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../../actions/challengeActions";
import EditForm from "./EditForm";
import Spinner from "../../shared/Spinner";
import {browserHistory} from "react-router";
import {Alert} from "react-bootstrap";

const toState = ({displayName, description, views, criteria, 'private': _private, club})=>({
    displayName,
    description,
    views,
    criteria,
    private: _private,
    club
});
class EditPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            challenge: toState(this.props.challenge || {})
        };
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({challenge: Object.assign({}, toState(nextProps.challenge))});
    }

    onSave(e) {
        e.preventDefault();
        const {challenge} = this.state;
        const challengeID = this.props.params.id;
        this.props.actions.editChallenge(challengeID, challenge).then(()=> {
            browserHistory.push('/challenge/' + challengeID);
        });
    }

    onChange(state) {
        const {challenge} = this.state;
        this.setState({challenge: Object.assign({}, challenge, state)});
    }

    render() {
        const {challenge} = this.state;
        if (!this.props.challenge) {
            return (<Spinner/>);
        }
        if (!this.props.challenge.canEdit){
         return (<Alert bsStyle="info">You are not authorized to edit this challenge.</Alert>);
        }

        return (<EditForm operation="Edit" challenge={challenge} onChange={this.onChange} onSave={this.onSave}/>);
    }
}

EditPage.propTypes = {
    params: PropTypes.object,
    challenge: PropTypes.object,
    actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    const challengeID = ownProps.params.id;
    if (challengeID && state.challenges.length > 0) {
        return {
            challenge: state.challenges.find(t=>t._id === challengeID)
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
