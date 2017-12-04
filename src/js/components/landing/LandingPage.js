import React, {PropTypes} from "react";
import LoginButton from "../layout/LoginButton";

const LandingPage = () => (
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

export default LandingPage;
