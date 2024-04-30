import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

type Props = {
    columns: GridColDef[],
    rows: object[]
    slug: string;
}

const DataTablePE = (props: Props) => {

    const navigate = useNavigate();

    const handleDelete = (IDPE: number) => {
        axios.delete(`${host_server}/${props.slug}/${IDPE}`)
    }
    const handleEditClick = (IDPE: number) => {
        navigate(`/EditarPersonalExterno/${IDPE}`);
    }

    const actionColumn: GridColDef = {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: 100,
        renderCell: (params) => {
            return (
                <div className="action">
                    <IconButton
                        onClick={() => handleEditClick(params.row.IDPE)}
                        color="primary"
                        aria-label="Editar"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.row.IDPE)}
                        color="secondary"
                        aria-label="Eliminar"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            );
        },
    };

return (
    <div className="dataTable">
        <DataGrid className="dataGrid"
            rows={props.rows}
            columns={[...props.columns, actionColumn]}
            getRowId={(row) => `${row.IDPE}`}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
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

export default DataTablePE