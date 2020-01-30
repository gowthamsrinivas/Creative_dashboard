import React from 'react';
import DataTable from 'react-data-table-component';

const Table = (props) => {
    return(
        <DataTable
        title="Dashboard Results"
        columns={props.columns}
        data={props.data}
        striped
        highlightOnHover
        pagination={true}
        paginationPerPage={10}
      />
    );
}

export default Table;