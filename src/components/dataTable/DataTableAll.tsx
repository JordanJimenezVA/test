import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

interface Row {
    IDR: number;
    Rol: string;
    // Agrega las demás propiedades de tus filas aquí
}

type Props = {
    columns: GridColDef[],
    rows: Row[]; // Usa la interfaz Row para describir las filas
    slug: string;
}

const DataTableAll = (props: Props) => {
    const navigate = useNavigate();
    const [rows] = useState<Row[]>(props.rows);


    const handleMarcarSalida = (IDR: number) => {
        navigate(`/FormularioSalida/${IDR}`);
    }
    const actionColumn: GridColDef = {
        field: 'acciones',
        headerName: 'Acciones',
        sortable: false,
        width: 150,
        renderCell: (params) => {
            const row = params.row as Row; // Castear params.row como Row
            return <div className="action">
                <Link to={`${props.slug}/${row.IDR}`}>
                    {/* <img src="view.svg" alt="" /> */}
                </Link>
                <div className="marcar-salida" onClick={() => handleMarcarSalida(row.IDR)}>
                    <img src="/view2.svg" alt="" />
                </div>
            </div>
        }
    }

    return (
        <div className="dataTable">
            <DataGrid className="dataGrid"
                rows={rows}
                columns={[...props.columns, actionColumn]}

                getRowId={(row) => `${row.IDR}`}
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

export default DataTableAll
