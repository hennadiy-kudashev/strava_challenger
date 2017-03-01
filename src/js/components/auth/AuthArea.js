import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginButton from '../layout/LoginButton';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

class AuthArea extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        if (!this.props.auth.access_token){
            return (<LoginButton/>);
        }
        else {
            return (<ListItem
                avatar={this.props.user.avatar}
                caption={this.props.user.user_name}
                legend={this.props.user.first_name + ' ' + this.props.user.last_name}
            />);
        }  
    }
}

AuthArea.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        user: state.user
    };
}

export default connect(mapStateToProps)(AuthArea);