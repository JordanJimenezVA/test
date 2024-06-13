import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect  } from 'react';

interface Row {
    IDL: number;
    Rol: string;
}

type Props = {
    columns: GridColDef[],
    rows: Row[]; 
    slug: string;
}

const DataTableL = (props: Props) => {

    const [rows, setRows] = useState(props.rows);

    useEffect(() => {
        setRows(props.rows);
    }, [props.rows]);

    return (
        <div className="dataTable">
            <DataGrid className="dataGrid"
                rows={rows}
                columns={[...props.columns]}

                getRowId={(row) => `${row.IDL}`}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                localeText={{
                    noRowsLabel: 'No hay registros',
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}

                pageSizeOptions={[10]}
                disableColumnMenu
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
            />
        </div>
    )
}

export default DataTableL
