import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
    rows,
    columns,
    loading,
}) => {
    const [pageSize, setPageSize] = useState(50);
    return (
        <div style={{ height: "80vh", width: "100%", overflowY: "auto" }}>
            <DataGrid
                rows = {rows}
                columns = {columns}
                loading = {loading}
                pageSize={pageSize}
                pagination
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[50]}
            />
        </div>
    );
};

export default DataTable;