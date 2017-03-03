import React, {PropTypes} from "react";
import {List, ListItem, ListSubHeader} from "react-toolbox/lib/list";

const MemberList = ({members}) => {
    return (
        <List>
            <ListSubHeader caption="Members"/>
            {
                members.map(member=>{
                    return (<ListItem key={member.id}
                        avatar={member.profile}
                        caption={`${member.firstname} ${member.lastname}`}
                        legend={`${member.city}, ${member.state}, ${member.country}`}
                    />);
                })
            }
        </List>

    );
};

MemberList.propTypes = {
    members: PropTypes.array.isRequired
};

export default MemberList;