import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Grid from '../layout/Grid';
import * as clubActions from "../../actions/clubActions";
import * as statsActions from "../../actions/statsActions";
import {bindActionCreators} from "redux";

class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.clubActions.getClubMembers();
    }

    componentWillUpdate(nextProps, nextState) {
        const {actions, members } = nextProps;
        actions.statsActions.getStats(members);
    }

    render() {
        const {members} = this.props;
        return (
            <Grid members={members}/>
        );
    }
}

DashboardPage.propTypes = {
    members: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        members: state.club.members
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            clubActions: bindActionCreators(clubActions, dispatch),
            statsActions: bindActionCreators(statsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
