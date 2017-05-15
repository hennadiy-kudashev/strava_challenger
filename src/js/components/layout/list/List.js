import React, {PropTypes} from "react";
import ListItem from "./ListItem.js";

const List = ({challenges, user}) => {
    return (
        <ul className="products-list product-list-in-box">
            {
                challenges.map(challenge =>
                    <ListItem key={challenge.id} challenge={challenge} user={user}/>
                )
            }
        </ul>
    );
};

List.propTypes = {
    challenges: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

export default List;
