import React, {PropTypes} from "react";
import AuthArea from '../auth/AuthArea';


class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <AuthArea />
            </div>
        );
    }
}

export default LandingPage;
