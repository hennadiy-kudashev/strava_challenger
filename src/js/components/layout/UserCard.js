import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class UserCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {avatar, fullName} = this.props.user;
        return (
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src={avatar} className="user-image" alt="User Image" />
                <span className="hidden-xs">{fullName}</span>
            </a>
        );
    }
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(UserCard);