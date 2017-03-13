import React, {PropTypes} from "react";
import {connect} from "react-redux";
import LoginButton from "../layout/LoginButton";
import {browserHistory} from "react-router";


class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            browserHistory.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <LoginButton/>
            </div>
        );
    }
}

LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(LandingPage);
