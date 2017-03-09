import React, { Component, PropTypes } from 'react';
import Header from './layout/Header';
import AuthArea from './auth/AuthArea';

class App extends Component {
    render() {
        return (
            <div className="main" >
                <Header />
                <AuthArea />
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer">Powered by Strava</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
