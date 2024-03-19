import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";


type Props = {
    columns: GridColDef[],
    rows: object[]
    slug: string;
}

const DataTablePE = (props: Props) => {

    const handleDelete= (IDPE: number) => {
        //axios.delete(`/api/${slug}/idPI`)
        console.log(IDPE+ "eliminado")
    }

const actionColumn: GridColDef = {

    field: 'acciones',
    headerName: 'Acciones',
    width: 100,
    renderCell: (params) => {
        return <div className="action">
            <Link to={`${props.slug}/${params.row.IDPE}`}>
                <img src="view.svg" alt="" />
            </Link>
            <div className="delete" onClick={() => handleDelete(params.row.IDPE)}>
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