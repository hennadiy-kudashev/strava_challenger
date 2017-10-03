import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from "react-bootstrap";

const AdminButtons = ({challenge, user}) => {
    // if (challenge.createdBy !== user.id){
    //     return null;
    // }
    return (<div>
        <Button type="button" bsClass="btn btn-default pull-right">Remove</Button>
        <Link className="btn btn-default pull-right" to={"/challenge/edit/"+ challenge.id}>Edit</Link>
    </div>);
};

AdminButtons.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default AdminButtons;