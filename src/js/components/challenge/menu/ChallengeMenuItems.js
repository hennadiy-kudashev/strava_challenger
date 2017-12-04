import React, {PropTypes} from "react";
import ChallengeMenuItem from "./ChallengeMenuItem";

const ChallengeMenuItems = ({title, challenges, pathname}) => {
    const isActive = (id)=> {
        return pathname.split('/').includes(id);
    };
    if (challenges.length == 0) {
        return null;
    }
    return (
        <ul className="sidebar-menu">
            <li className="header">{title}</li>
            {
                challenges.map(challenge => {
                    return <ChallengeMenuItem key={challenge._id} active={isActive(challenge._id)} challenge={challenge}/>;
                })
            }
        </ul>);
};

ChallengeMenuItems.propTypes = {
    title: PropTypes.string.isRequired,
    challenges: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
};

export default ChallengeMenuItems;