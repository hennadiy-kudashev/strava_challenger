import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as challengeActions from "../../../actions/challengeActions";

class CreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {user} = this.props;
        return (<div>{JSON.stringify(user)}</div>);
    }
}

CreatePage.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        challengeActions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);