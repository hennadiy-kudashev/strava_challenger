import React, { PropTypes } from 'react';
import cx from 'classnames';
import TableRow from './TableRow';

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc'
};

const Table = ({ columns, rows, sortBy, sortDirection, onSort }) => {
  const thClassName = column => cx({
      'sorting': column.sortable,
      'sorting_desc': column.key === sortBy && sortDirection === SORT_DIRECTION.DESC,
      'sorting_asc': column.key === sortBy && sortDirection === SORT_DIRECTION.ASC,
    }
  );
  const handleColumnClickFor = (column) => () => {
    if (onSort) {
      const direction = column.key === sortBy ? (sortDirection === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC) : SORT_DIRECTION.DESC;
      onSort(column.key, direction);
    }
  };
  return (
    <table className={cx("table table-bordered table-hover dataTable", { 'dataTable': sortBy })}>
      <thead>
      <tr>
        {columns.map((column, index) => <th onClick={column.sortable ? handleColumnClickFor(column) : undefined}
                                            className={thClassName(column)} key={index}>{column.title || column}</th>)}
      </tr>
      </thead>
      <tbody>
      {
        rows.map((row, index) => <TableRow key={index} row={row}/>)
      }
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onSort: PropTypes.func,
};

export default Table;
