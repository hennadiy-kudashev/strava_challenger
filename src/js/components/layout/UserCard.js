import React, {PropTypes} from 'react';
import { Card, CardTitle } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';

const UserCard = ({avatar, title, subtitle}) => {
    return (
        /*<Card>
            <CardTitle
                avatar={avatar}
                title={title}
                subtitle={subtitle}
            />
        </Card>*/
        <Avatar image={avatar} title={title} />
    );
};

UserCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default UserCard;