import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";


type Props = {
    columns: GridColDef[],
    rows: object[]
    slug: string;
}

const DataTable = (props: Props) => {

    const handleDelete= (IDPI: number) => {
        //axios.delete(`/api/${slug}/idPI`)
        console.log(IDPI+ "eliminado")
    }

const actionColumn: GridColDef = {

    field: 'acciones',
    headerName: 'Acciones',
    sortable: false,
    width: 100,
    renderCell: (params) => {
        return <div className="action">
            <Link to={`${props.slug}/${params.row.IDPI}`}>
                <img src="view.svg" alt="" />
            </Link>
            <div className="delete" onClick={() => handleDelete(params.row.IDPI)}>
                <img src="/delete.svg" alt="" />
            </div>
        </div>

    }
}

return (
    <div className="dataTable">
        <DataGrid className="dataGrid" 
            rows={props.rows}
            columns={[...props.columns, actionColumn]}
            
            getRowId={(row) => `${row.IDPI}`}
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

export default DataTable