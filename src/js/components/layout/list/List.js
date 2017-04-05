import React, {PropTypes} from 'react';
import ListItem from './ListItem.js';

const List = ({challenges, user}) => {
    return (
        <div className="box box-default">
            <div className="box-header with-border">
                <h3 className="box-title">
                    List of Challenges
                </h3>
            </div>
            <div className="box-body">
                <ul className="products-list product-list-in-box">
                    {
                        challenges.map(challenge =>
                            <ListItem key={challenge.id} challenge={challenge} user={user}/>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

List.propTypes = {
    challenges: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

export default List;
