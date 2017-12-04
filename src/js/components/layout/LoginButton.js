import React from "react";
import AuthApi from "../../api/authApi";


class LoginButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            url: ''
        };
    }

    componentWillMount() {
        new AuthApi().getUrl().then(({url})=> {
            this.setState({url});
        });
    }

    render() {
        const {url} = this.state;
        if (!url) {
            return null;
        }
        return (<a href={url} className="hero-btn"/>);
    }
}


export default LoginButton;
