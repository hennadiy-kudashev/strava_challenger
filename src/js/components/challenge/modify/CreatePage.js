import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../../actions/challengeActions";
import views from "../view/views";
import thresholds from "../view/thresholds";
import thresholdBy from "../view/thresholdBy";
import moment from "moment";
import {browserHistory} from "react-router";
import EditForm from "./EditForm";

class CreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            challenge: {
                displayName: '',
                description: '',
                views: Object.keys(views),
                criteria: {
                    types: ['Run'],
                    datetime: {
                        after: moment().add(-1, 'years').hour(0).minute(0).second(0).format(),
                        before: moment().hour(23).minute(59).second(0).format()
                    },
                    threshold: {
                        [Object.keys(thresholds)[0]]: 0,
                        by: thresholdBy.TOTAL
                    }
                },
                private: true
            }
        };
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSave(e) {
        e.preventDefault();
        const challenge = this.state.challenge;
        this.props.actions.createChallenge(challenge).then((challenge)=>{
            browserHistory.push('/challenge/' + challenge._id);
        });
    }

    onChange(state) {
        const {challenge} = this.state;
        this.setState({challenge: Object.assign({}, challenge, state)});
    }

    render() {
        const {challenge} = this.state;
        return (<EditForm operation="Create" challenge={challenge} onChange={this.onChange} onSave={this.onSave}/>);
    }
}

CreatePage.propTypes = {
    actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(CreatePage);
