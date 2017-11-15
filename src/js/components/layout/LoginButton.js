import React from "react";
import UserApi from "../../api/userApi";


class LoginButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            url: ''
        };
    }

    componentWillMount() {
        new UserApi().getUrl().then(({url})=> {
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
