import React, { PropTypes } from 'react';

const TableRow = ({member}) => {
    return (
        <tr>
            <td>
                <strong>
                    {member.firstname} {member.lastname}
                </strong>
                <div className="text-muted">
                    <small>
                        {member.city}, {member.state}, {member.country}
                    </small>
                    <small>
                    </small>
                    <small>
                    </small>
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
