import React, { PropTypes } from 'react';

const TableRow = ({member}) => {
    return (
        <tr>
            <td>
                <div className="user-block">
                    <img src={member.profile} className="img-circle img-bordered-sm" alt="User Image" />
                    <div className="username">
                        {member.firstname} {member.lastname}
                    </div>
                    <div className="description">
                        {member.city}, {member.state}, {member.country}
                    </div>
                </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};

TableRow.propTypes = {
    member: PropTypes.object.isRequired
};

export default TableRow;
