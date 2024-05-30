// import { useState } from "react"
import "./tablaIngreso.scss"
// import AddR from "../../components/add/AddR"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import DataTableAll from "../../components/dataTable/DataTableAll";
const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDR', headerName: 'ID', width: 40, type: 'number' },
  {
    field: 'FECHAINGRESO',
    headerName: 'Fecha Ingreso',
    width: 140,
    editable: false,
    type: 'DATE',
    valueFormatter: (params) => {
      const date = new Date(params.value as string);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    },
  },
  {
    field: 'PERSONAL',
    headerName: 'Nombre',
    width: 170,
    editable: false,
    type: 'string',
    valueGetter: (params) => `${params.row.PERSONAL} ${params.row.APELLIDO}`,
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
    width: 150,
    editable: false,
    type: 'string',
  },
  {
    field: 'FECHAINGRESO',
    headerName: 'Fecha Ingreso',
    width: 220,
    editable: false,
    type: 'DATE',
    valueFormatter: (params) => {
      const date = params.value ? new Date(params.value as string) : null;
      if (date && !isNaN(date.getTime())) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
      } else {
        return ''; 
      }
    },
  },
  {
    field: 'estadoRevision',
    headerName: 'Estado',
    width: 140,
    editable: false,
    type: 'string',
}
];
const TablaIngreso = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['registros'],
    queryFn: () =>
      fetch(`${host_server}/TablaIngreso`).then((res) =>
        res.json(),

      ),

  });

  return (
    <div className="Camiones">
      <div className="info">
        <h1 className="h1d">LISTA DE PERSONAS/CAMIONES EN INSTALACIONES</h1>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableAll slug="AllR" columns={columns} rows={data} />
      )}
      {/* {open && <AddR slug="AllR" columns={columns} setOpen={setOpen} />} */}
    </div>
  )
}

export default TablaIngreso