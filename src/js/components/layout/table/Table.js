import React, { PropTypes } from 'react';
import TableRow from './TableRow';

const Table = ({columns, rows}) => {
    return (
        <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {columns.map(column => <th>{column}</th>)}
              </tr>
            </thead>
            <tbody>
                {
                    rows.map( row => <TableRow key={row.key} row={row} /> )
                }
            </tbody>
        </table>
    );
};

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
};

export default Table;
