import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authActions from "../../actions/authActions";
import {browserHistory} from "react-router";
import Spinner from "../shared/Spinner";

class CodeReceiverPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {location} = this.props;

        if (location.query.error) {
            const error = location.query.error;
            return (<div>{error}</div>);
        }
        else {
            const code = location.query.code;
            this.props.actions.authenticate(code);
            return (<Spinner/>);
        }
    }
}
CodeReceiverPage.propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeReceiverPage);
