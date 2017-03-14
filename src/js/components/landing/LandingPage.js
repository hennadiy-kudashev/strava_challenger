import React, {PropTypes} from "react";
import {connect} from "react-redux";
import LoginButton from "../layout/LoginButton";

class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
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
