import React, { Component, PropTypes } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';

class App extends Component {
    render() {
        return (
            <div className="skin-yellow-light" >
                <div className="wrapper">
                    <Header />
                    <Sidebar />
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
