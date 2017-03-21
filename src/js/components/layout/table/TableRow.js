import React, { PropTypes } from 'react';

const TableRow = ({row}) => {
    return (
        <tr>
            {row.map(item=><td>{item}</td>)}
        </tr>
    );
};

TableRow.propTypes = {
    row: PropTypes.object.isRequired
};

export default TableRow;
