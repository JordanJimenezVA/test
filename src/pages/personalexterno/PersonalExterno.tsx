import { useState } from "react"
import "./personalExterno.scss"
import DataTablePE from "../../components/dataTable/DataTablePE"
import AddPE from "../../components/add/AddPE"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'IDPE', headerName: 'ID', width: 45, type: 'number'},
  {
    field: 'RUTPE',
    headerName: 'Rut',
    type: 'string',
    width: 150,
    editable: false,
  },
  {
    field: 'NOMBREPE',
    headerName: 'Nombre',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'APELLIDOPE',
    headerName: 'Apellido',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'VEHICULOPE',
    headerName: 'Vehiculo',
    width: 180,
    editable: false,
    type: 'string',
  },
  {
    field: 'COLORPE',
    headerName: 'Color',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'PATENTEPE',
    headerName: 'Patente',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'ROLPE',
    headerName: 'Rol',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'EMPRESAPE',
    headerName: 'Empresa',
    width: 200,
    editable: false,
    type: 'string',
  },
  {
    field: 'ESTADOPE',
    headerName: 'Estado',
    width: 150,
    editable: false,
    type: 'string',
  }
];

const PersonalExterno = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['personalexterno'],
    queryFn: () =>
    fetch('https://nodejs-back-production.up.railway.app/Personal%20Externo').then((res) =>
        res.json(),
      ),
  })
  const [open,setOpen] = useState(false)
  return (
    <div className="PersonalExterno">
      <div className="info">
          <h1 className="h1d">Personal Externo</h1>
        <button onClick={()=> setOpen(true)}>Ingresar Personal Externo</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTablePE slug="Personal Externo" columns={columns} rows={data}/>
      )}
      {open && <AddPE slug="Personal Externo" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default PersonalExterno