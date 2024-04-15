import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const DataTable = ({
    rows,
    columns,
    loading,
}) => {
    const [pageSize, setPageSize] = useState(2);
    return (
        <DataGrid
            rows = {rows}
            columns = {columns}
            loading = {loading}
            checkboxSelection
            pageSize={pageSize}
            pagination
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[2, 5, 10]}
        />
    );
};

export default DataTable;