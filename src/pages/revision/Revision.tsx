import { GridColDef } from "@mui/x-data-grid";
import DataTableR from "../../components/dataTable/DatatableR";
import "./revision.scss"
import { useState } from "react";
import AddPI from "../../components/add/AddPI";
import { useQuery } from "@tanstack/react-query";

const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDR', headerName: 'ID', width: 40, type: 'number' },
  {
    field: 'PERSONAL',
    headerName: 'Nombre',
    width: 150,
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
    width: 260,
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
  }
];


const Revision = () => {
  const [open, setOpen] = useState(false)


  const { isLoading, data } = useQuery({
    queryKey: ['revision'],
    queryFn: () =>
      fetch(`${host_server}/Revision`).then((res) =>
        res.json(),
      ),
  })


  return (
    <div className="PI">
      <div className="info">
        <h1 className="h1d">Revision Camiones</h1>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableR slug="registros" columns={columns} rows={data} />
      )}
      {open && <AddPI slug="registros" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Revision