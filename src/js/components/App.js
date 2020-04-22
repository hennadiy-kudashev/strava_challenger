import React, { Component, PropTypes } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import classnames from 'classnames';

class App extends Component {
    constructor(props, context) {
        super(props);
        this.state = {isSidebar: false};
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(e) {
        e.preventDefault();
        this.setState({isSidebar: !this.state.isSidebar});
    }

    render() {
        return (
            <div className="skin-yellow-light" >
                <div className={classnames('wrapper', {'sidebar-open':this.state.isSidebar}, {'sidebar-collapse':!this.state.isSidebar})}>
                    <Header toggleSidebar={this.toggleSidebar}/>
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
