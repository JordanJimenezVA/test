// import { useState } from "react"
import "./tablaIngreso.scss"
// import AddR from "../../components/add/AddR"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import DataTableAll from "../../components/dataTable/DataTableAll";


const columns: GridColDef[] = [
  { field: 'IDR', headerName: 'ID', width: 40, type: 'number'},
  {
    field: 'PERSONAL',
    headerName: 'Nombre',
    width: 140,
    editable: false,
    type: 'string',
  },
  {
    field: 'APELLIDO',
    headerName: 'Apellido',
    width: 140,
    editable: false,
    type: 'string',
  },
  {
    field: 'RUT',
    headerName: 'Rut ',
    type: 'string',
    width: 150,
    editable: false,
  },
  {
    field: 'PATENTE',
    headerName: 'Patente',
    width: 110,
    editable: false,
    type: 'string',
  },
  {
    field: 'ROL',
    headerName: 'Rol',
    width: 200,
    editable: false,
    type: 'string',
  },
  {
    field: 'OBSERVACIONES',
    headerName: 'Observaciones',
    width: 200,
    editable: false,
    type: 'string',
  },
  {
    field: 'GUIADESPACHO',
    headerName: 'Guia Despacho/Factura',
    width: 210,
    editable: false,
    type: 'string',
  },
  {
    field: 'FECHAINGRESO',
    headerName: 'Fecha Ingreso',
    width: 180,
    editable: false,
    type: 'DATE',
    valueFormatter: (params) => {
        const date = new Date(params.value as string);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      },
  }
];
const TablaIngreso = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['registros'],
    queryFn: () =>
    fetch('https://nodejs-back-production.up.railway.app/TablaIngreso').then((res) =>
        res.json(),
      ),
  })
  // const [open,setOpen] = useState(false)

  return (
    <div className="Camiones">
      <div className="info">
          <h1 className="h1d">LISTA DE PERSONAS/CAMIONES ADENTRO</h1>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableAll slug="AllR" columns={columns} rows={data}/>
      )}
      {/* {open && <AddR slug="AllR" columns={columns} setOpen={setOpen} />} */}
    </div>
  )
}

export default TablaIngreso