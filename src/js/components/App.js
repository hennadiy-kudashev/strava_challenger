import React, { Component, PropTypes } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import classnames from 'classnames';
import Divider from "./layout/Divider";

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
        const { isSidebar } = this.state;
        return (
            <div className="skin-yellow-light" >
                <div className={classnames('wrapper', {'sidebar-open':isSidebar}, {'sidebar-collapse':!isSidebar})}>
                    <Header/>
                    <Sidebar />
                    <div className="content-wrapper">
                        <Divider toggleSidebar={this.toggleSidebar} open={isSidebar} />
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
