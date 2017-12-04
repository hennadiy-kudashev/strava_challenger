import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import Spinner from "../shared/Spinner";
import Box from "../layout/Box";
import Tabs from "../layout/tabs/Tabs";
import TabPane from "../layout/tabs/TabPane";
import views from "./view/views";
import Info from "./Info";
import Progress from "./Progress";
import JoinButton from "../layout/JoinButton";
import AdminButtons from "./AdminButtons";

class ChallengePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.loadChallenge();
    }

    componentWillReceiveProps(nextProps) {
        //only load challenge for the first time and when path has changed
        if (nextProps.challenge && nextProps.challenge._id !== (this.props.challenge ? this.props.challenge._id : '')) {
            this.loadChallenge(nextProps);
        }
    }

    loadChallenge(props = this.props) {
        const {challenge, actions} = props;
        if (challenge) {
            if (!challenge.athletes) {
                actions.challengeActions.getChallengeAthletes(challenge._id);
            }
        }
    }

    render() {
        const {challenge, user} = this.props;
        if (challenge && challenge.athletes) {
            const labels = challenge.views.map(view=>views[view].label);
            return (
                <Box title={challenge.displayName}>
                    <Info challenge={challenge}/>
                    <Progress challenge={challenge} user={user}/>
                    <JoinButton challenge={challenge} />
                    <AdminButtons challenge={challenge}/>
                    <Tabs labels={labels}>
                        {
                            challenge.views.map(view=> {
                                const View = views[view].component;
                                return (<TabPane key={challenge._id+view}>
                                    <View challenge={challenge}/>
                                </TabPane>);
                            })
                        }
                    </Tabs>
                </Box>
            );
        } else {
            return (<Spinner/>);
        }
    }
}

ChallengePage.propTypes = {
    challenge: PropTypes.object,
    user: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let challengeID = ownProps.params.id;
    let challenge;
    if (challengeID && state.challenges.length > 0) {
        challenge = state.challenges.find(t => t._id === challengeID);
    }
    return {
        challenge: challenge,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
