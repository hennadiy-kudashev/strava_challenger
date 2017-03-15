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

        // Hardcoded list of athletes for challange
        const athletes = [
            {
                id: '18192624',
                token: '2d86cee021852379115518352e9f9596eed897e6'
            },
            {
                id: '14419142',
                token: 'd7b559ae4e23f2e5eac0f47b9871a0c3f69bb4b3'
            }
        ];
        actions.statsActions.getStats(athletes);
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
