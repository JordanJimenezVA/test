import { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import axios from "axios";
import Swal from 'sweetalert2';
const host_server = import.meta.env.VITE_SERVER_HOST;
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    columns: GridColDef[],
    rows: object[]
    slug: string;
}

const DataTable = (props: Props) => {

    const [rows, setRows] = useState<object[]>(props.rows);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const deleteMutationa = useMutation({

        mutationFn: (IDNG: number) => {
            return axios.delete(`${host_server}/${props.slug}/${IDNG}`);
        },
        onSuccess: (IDNG) => {
            Swal.fire('Borrado!', 'El registro ha sido borrado.', 'success');
            queryClient.invalidateQueries({
                queryKey: [props.slug]
            });
            setRows(rows.filter((row: any) => row.IDNG !== IDNG));
        },
        onError: () => {
            Swal.fire('Error!', 'No se pudo borrar el registro.', 'error');
        }
    });


    const handleDelete = (IDNG: number) => {
        Swal.fire({
            title: '¿Estás seguro de borrar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutationa.mutate(IDNG);
            }
        });
    };

    const handleEditClick = (IDNG: number) => {
        navigate(`/EditarPersonasReportadas/${IDNG}`);
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
                        onClick={() => handleEditClick(params.row.IDNG)}
                        color="primary"
                        aria-label="Editar"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.row.IDNG)}
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
                editMode="row"
                columns={[...props.columns, actionColumn]}

                getRowId={(row) => `${row.IDNG}`}
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

export default DataTable