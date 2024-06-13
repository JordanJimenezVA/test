import { useState, useEffect  } from 'react';
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
const host_server = import.meta.env.VITE_SERVER_HOST;


type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string;
}

const DataTablePE = (props: Props) => {
    const [rows, setRows] = useState(props.rows);
    const navigate = useNavigate();

    // const fetchRows = async () => {
    //     const response = await axios.get(`${host_server}/${props.slug}`);
    //     setRows(response.data);
    // };

    const handleDelete = async (IDPE: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de borrar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!'
        });
        if (result.isConfirmed) {
            await axios.delete(`${host_server}/${props.slug}/${IDPE}`);
            Swal.fire('Borrado!', 'El registro ha sido borrado.', 'success');
            setRows(rows.filter((row: any) => row.IDPE !== IDPE));
        }
    };

    const handleEditClick = (IDPE: number) => {
        navigate(`/EditarPersonalExterno/${IDPE}`);
    }

    useEffect(() => {
        setRows(props.rows);
    }, [props.rows]);

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
                rows={rows}
                columns={[...props.columns, actionColumn]}
                getRowId={(row) => `${row.IDPE}`}
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
    );
}

export default DataTablePE;
