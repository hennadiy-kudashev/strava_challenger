import React, {PropTypes} from "react";
import {connect} from "react-redux";
import LoginButton from "../layout/LoginButton";

class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="main">
                <div className="hero">
                    <div className="hero-heading">
                        <h1 className="hero-title">Fulled <span>by</span> Challenge</h1>
                    </div>
                    <LoginButton/>
                </div>
                <div className="main-logo-api"></div>
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
