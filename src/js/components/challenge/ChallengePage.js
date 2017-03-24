import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import Spinner from "../shared/Spinner";
import Grid from "../layout/Grid";
import Tabs from "../layout/tabs/Tabs";
import TabPane from "../layout/tabs/TabPane";
import views from "./view/views";
import JoinButton from '../layout/JoinButton';

class ChallengePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(next) {
        const {challenge, actions} = next;

        if (!challenge.isLoaded) {
            actions.challengeActions.getChallenge(challenge.id, challenge.athletes, challenge.criteria);
        }
    }

    render() {
        const {challenge} = this.props;
        if (challenge && challenge.isLoaded) {
            const labels = challenge.views.map(view=>views[view].label);
            return (
                <Grid title={challenge.displayName}>
                    <JoinButton challenge={challenge} />
                    <Tabs labels={labels}>
                        {
                            challenge.views.map(view=>{
                                const View = views[view].component;
                                return (<TabPane key={view}>
                                    <View challenge={challenge} />
                                </TabPane>);
                            })
                        }
                    </Tabs>
                </Grid>
            );
        } else {
            return (<Spinner/>);
        }
    }
}

ChallengePage.propTypes = {
    challenge: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let challengeID = ownProps.params.id;
    let challenge;
    if (challengeID && state.challenges.length > 0) {
        challenge = state.challenges.find(t => t.id === challengeID);
    }
    return {
        challenge: challenge
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
