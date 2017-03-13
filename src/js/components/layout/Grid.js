import React, { PropTypes } from 'react';
import Table from '../layout/table/Table';

const Grid = ({members}) => {
    return (
        <div className="content">
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Default Box Example</h3>
                </div>
                <div className="box-body">
                    <Table members={members} />
                </div>
                <div className="box-footer">
                </div>
            </div>
        </div>
    );
};

Grid.propTypes = {
    members: PropTypes.array.isRequired
};

export default Grid;
