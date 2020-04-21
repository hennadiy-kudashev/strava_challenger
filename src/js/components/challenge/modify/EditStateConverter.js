import moment from "moment";
import thresholdBy from "../view/thresholdBy";
import { THRESHOLD_CRITERION } from "../view/thresholds";

const EditStateConverter = {
    fromAPI: (challenge) => {
        return {
            displayName: challenge.displayName,
            description: challenge.description,
            views: challenge.views,
            criteria_types: challenge.criteria.types,
            criteria_datetime: {
                startDate: moment(challenge.criteria.datetime.after),
                endDate: moment(challenge.criteria.datetime.before)
            },
            criteria_threshold: {
                name: Object.keys(challenge.criteria.threshold)[0],
                value: challenge.criteria.threshold[Object.keys(challenge.criteria.threshold)[0]],
                by: challenge.criteria.threshold.by
            },
            criteria_min_activities: {
                value: challenge.criteria.minActivities.value,
                by: challenge.criteria.minActivities.by,
            },
            criteria_activity_length: {
                name: challenge.criteria.activityLength.criterion,
                value: challenge.criteria.activityLength.value,
            },
            private: challenge.private,
            club: challenge.club
        };
    },
    toApi(state){
        return {
            displayName: state.displayName,
            description: state.description,
            views: state.views,
            criteria: {
                types: state.criteria_types,
                datetime: {
                    after: state.criteria_datetime.startDate.format(),
                    before: state.criteria_datetime.endDate.format()
                },
                threshold: {
                    [state.criteria_threshold.name]: state.criteria_threshold.value,
                    by: state.criteria_threshold.by
                },
                minActivities:{
                    value: state.criteria_min_activities.value,
                    by: state.criteria_min_activities.by
                },
                activityLength: {
                    criterion: state.criteria_activity_length.name,
                    value: state.criteria_activity_length.value
                },
            },
            private: state.private,
            club: state.club
        };
    }
};

export default EditStateConverter;
