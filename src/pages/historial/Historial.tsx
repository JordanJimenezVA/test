import { useState } from "react";
import DataTableL from "../../components/dataTable/DataTableL";
import "./logs.scss"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import AddL from "../../components/add/AddL";
const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDL', headerName: 'ID', width: 40, type: 'number' },
  {
    field: 'PERSONAL',
    headerName: 'Nombre',
    width: 110,
    editable: false,
    type: 'string',
  },
  {
    field: 'APELLIDO',
    headerName: 'Apellido',
    width: 110,
    editable: false,
    type: 'string',
  },
  {
    field: 'RUT',
    headerName: 'Rut ',
    type: 'string',
    width: 140,
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
    field: 'SELLO',
    headerName: 'Sello',
    width: 90,
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
      const date = params.value ? new Date(params.value as string) : null;
      if (date && !isNaN(date.getTime())) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      } else {
        return ''; // Devolver un valor vacío si la fecha no es válida
      }
    },
  },
  {
    field: 'FECHASALIDA',
    headerName: 'Fecha Salida',
    width: 180,
    editable: false,
    type: 'DATE',
    valueFormatter: (params) => {
      const date = params.value ? new Date(params.value as string) : null;
      if (date && !isNaN(date.getTime())) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      } else {
        return ''; // Devolver un valor vacío si la fecha no es válida
      }
    },
  }
];
const Historial = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['logs'],
    queryFn: () =>
      fetch(`${host_server}/Logs`).then((res) =>
        res.json(),
      ),
  })
  const [open,setOpen] = useState(false)
  return (
    <div className="Camiones">
      <div className="info">
        <h1 className="h1d">REVISION DE LOGS</h1>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableL slug="logs" columns={columns} rows={data} />
      )}
      {open && <AddL slug="logs" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Historial