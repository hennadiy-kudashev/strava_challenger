import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as errorActions from "../../actions/errorActions";
import {ToastContainer, ToastMessage} from "react-toastr";

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Error extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate() {
        this.props.errors.forEach(error=> {
            this.refs.container.error(error);
            this.props.actions.removeError(error);
        });
    }

    render() {
        return (
            <ToastContainer ref="container"
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right"/>
        );
    }
}

Error.propTypes = {
    errors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(errorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);