import moment from "moment";

const EditStateConverter = {
    fromAPI: (challenge) => {
        return {
            displayName: challenge.displayName,
            description: challenge.description,
            views: challenge.views,
            criteria_type: challenge.criteria.type,
            criteria_datetime: {
                startDate: moment(challenge.criteria.datetime.after),
                endDate: moment(challenge.criteria.datetime.before)
            },
            criteria_threshold: {
                name: Object.keys(challenge.criteria.threshold)[0],
                value: challenge.criteria.threshold[Object.keys(challenge.criteria.threshold)[0]]
            },
            private: challenge.private
        };
    },
    toApi(state){
        return {
            displayName: state.displayName,
            description: state.description,
            views: state.views,
            criteria: {
                type: state.criteria_type,
                datetime: {
                    after: state.criteria_datetime.startDate.format(),
                    before: state.criteria_datetime.endDate.format()
                },
                threshold: {
                    [state.criteria_threshold.name]: state.criteria_threshold.value
                }
            },
            private: state.private
        };
    }
};

export default EditStateConverter;
