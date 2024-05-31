import DataTableL from "../../components/dataTable/DataTableL";
import "./logs.scss"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
const host_server = import.meta.env.VITE_SERVER_HOST;



const Historial = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['Logs'],
    queryFn: () =>
      fetch(`${host_server}/Logs`).then((res) =>
        res.json(),
      ),
  })
  
  const columns: GridColDef[] = [
    { field: 'IDL', headerName: 'ID', width: 40, type: 'number' },
    {
      field: 'NOMBRE',
      headerName: 'Nombre',
      width: 200,
      editable: false,
      type: 'string',
      valueGetter: (params) => `${params.row.PERSONAL} ${params.row.APELLIDO}`,
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
      width: 180,
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
      headerName: 'Planilla',
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
      type: 'dateTime',
      valueGetter: (params) => {
        const date = new Date(params.row.FECHAINGRESO); // Convertir la fecha de texto a objeto Date
        return date; // Formatear la fecha y hora como quieras
      },
    },
    {
      field: 'FECHASALIDA',
      headerName: 'Fecha Salida',
      width: 180,
      editable: false,
      type: 'DATE',
    }
  ];

  return (
    <div className="Camiones">
      <div className="info">
        <h1 className="h1d">REVISION DE LOGS</h1>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableL slug="Logs" columns={columns} rows={data} />
      )}
    </div>
  )
}

export default Historial