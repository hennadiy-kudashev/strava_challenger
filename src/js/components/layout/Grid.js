import React, { PropTypes } from 'react';
import Table from '../layout/table/Table';

const Grid = ({title, columns, rows}) => {
    return (
        <div className="content">
            <div className="box box-default">
                <div className="box-header">
                    <h3 className="box-title">{title}</h3>
                </div>
                <div className="box-body">
                    <Table columns={columns} rows={rows} />
                </div>
                <div className="box-footer">
                </div>
            </div>
        </div>
    );
};

Grid.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
};

export default Grid;
