import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

type Props = {

    columns: GridColDef[],
    rows: object[]
    slug: string;
}


const DataTableCA = (props: Props) => {

    const navigate = useNavigate();

    const handleDeleteCA = (IDCA: number) => {

        axios.delete(`${host_server}/camiones/${IDCA}`)
    }
    const handleEditClick = (IDCA: number) => {
        navigate(`/EditarCamiones/${IDCA}`);
    }

    const actionColumn: GridColDef = {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    <IconButton
                        onClick={() => handleEditClick(params.row.IDCA)}
                        color="primary"
                        aria-label="Editar"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteCA(params.row.IDCA)}
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
                getRowId={(row) => `${row.IDCA}`}
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

export default DataTableCA