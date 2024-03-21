import { useState } from "react"
import "./camiones.scss"
import DataTableCA from "../../components/dataTable/DataTableCA"
import AddCA from "../../components/add/AddCA"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'IDCA', headerName: 'ID', width: 50, type: 'number'},
  {
    field: 'RUTCA',
    headerName: 'Rut Chofer',
    width: 130,
    editable: false,
    type: 'string',
  },
  {
    field: 'CHOFERCA',
    headerName: 'Nombre Chofer',
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'APELLIDOCHOFERCA',
    headerName: 'Apellido Chofer',
    width: 170,
    editable: false,
    type: 'string',
  },
  {
    field: 'PATENTECA',
    headerName: 'Patente ',
    type: 'string',
    width: 150,
    editable: false,
  },
  // {
  //   field: 'ROLCA',
  //   headerName: 'Rol',
  //   type: 'string',
  //   width: 150,
  //   editable: false,
  // },
  {
    field: 'MARCACA',
    headerName: 'Marca',
    width: 140,
    editable: false,
    type: 'string',
  },
  {
    field: 'TIPOCA',
    headerName: 'Tipo',
    width: 200,
    editable: false,
    type: 'string',
  },
  {
    field: 'MODELOCA',
    headerName: 'Modelo',
    width: 160,
    type: 'string',
  },
  {
    field: 'COLORCA',
    headerName: 'Color',
    width: 120,
    type: 'string',
  },
  {
    field: 'EMPRESACA',
    headerName: 'Empresa',
    width: 160,
    type: 'string',
  }
];
const Camiones = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['camiones'],
    queryFn: () =>
    fetch('http://localhost:8800/Camiones').then((res) =>
        res.json(),
      ),
  })
  const [open,setOpen] = useState(false)
  return (
    <div className="Camiones">
      <div className="info">
          <h1 className="h1d">Camiones</h1>
        <button onClick={()=> setOpen(true)}>Ingresar Camiones</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableCA slug="camiones" columns={columns} rows={data}/>
      )}
      {open && <AddCA slug="camiones" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Camiones
