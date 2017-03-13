import React, { PropTypes } from 'react';
import TableRow from './TableRow';

const Table = ({members}) => {
    return (
        <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Rendering engine</th>
                <th>Browser</th>
                <th>Platform(s)</th>
                <th>Engine version</th>
                <th>CSS grade</th>
              </tr>
            </thead>
            <tbody>
                {
                    members.map( member => <TableRow member={member} /> )
                }
            </tbody>
        </table>
    );
};

Table.propTypes = {
    members: PropTypes.array.isRequired
};

export default Table;
