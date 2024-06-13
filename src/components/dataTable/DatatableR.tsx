import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { useNavigate } from 'react-router-dom';

type Props = {
    columns: GridColDef[],
    rows: object[]
    slug: string;
}

const DataTableR = (props: Props) => {
    const navigate = useNavigate();

    const handleRevison = (IDR: number) => {
        navigate(`/RevisionCamion/${IDR}`);
    }

    const actionColumn: GridColDef = {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: 120,
        renderCell: (params) => {
            return (
                <div className="action">
                    <div className="marcar-salida" onClick={() => handleRevison(params.row.IDR)}>
                        <button type="button" className="btn-revision-datatable">Revision</button>
                    </div>
                </div>
            );
        },
    };

    return (
        <div className="dataTable">
            <DataGrid className="dataGrid"
                rows={props.rows}
                editMode="row"
                columns={[...props.columns, actionColumn]}
                getRowId={(row) => `${row.IDR}`}
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

export default DataTableR