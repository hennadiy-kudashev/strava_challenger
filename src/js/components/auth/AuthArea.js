import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginButton from '../layout/LoginButton';
import UserCard from '../layout/UserCard';

class AuthArea extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        if (!this.props.auth.access_token){
            return (<LoginButton/>);
        }
        else {
            return(<div>Logged in</div>);
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
