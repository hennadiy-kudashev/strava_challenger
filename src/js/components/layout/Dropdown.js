import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authAction from '../../actions/authActions';


class Dropdown extends React.Component {
    constructor(props, context) {
        super(props);
        this.onSingOutClicked = this.onSingOutClicked.bind(this);
    }

    onSingOutClicked(e) {
        e.preventDefault();
        this.props.actions.authAction.logout();
    }

    render() {
        const {profile, firstname, lastname} = this.props.user;

        return (
            <ul className="dropdown-menu">
                <li className="user-header">
                    <img src={profile} className="img-circle" alt="User Image"/>
                    <p>
                        {firstname} {lastname}
                    </p>
                </li>
                <li className="user-footer">
                    <div className="pull-right">
                        <a href="#" className="btn btn-default btn-flat" onClick={this.onSingOutClicked}>Sign out</a>
                    </div>
                </li>
            </ul>
        );
    }
}

Dropdown.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            authAction: bindActionCreators(authAction, dispatch)
        }
    };
}

export default connect(null, mapDispatchToProps)(Dropdown);

