import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import {browserHistory} from "react-router";

class CodeReceiverPage extends React.Component{
    constructor(props, context){
        super(props, context);
    }

    render() {
        const {location} = this.props;
        
        if (location.query.error){
            const error = location.query.error;
            this.props.actions.requestAccessDenied(error);
            return (<div>{error}</div>);
        }
        else {
            const code = location.query.code;
            this.props.actions.requestAccessSuccess(code);
            browserHistory.push('/');
            return (<div>{code}</div>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeReceiverPage);