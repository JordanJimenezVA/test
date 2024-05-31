import DataTableL from "../../components/dataTable/DataTableL";
import "./logs.scss"
import { format, toZonedTime } from 'date-fns-tz';
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


  const formatDate = (date: string | null | undefined) => {
    if (!date) {
      return '';
    }
    const zonedDate = toZonedTime(date, 'America/Santiago');
    return format(zonedDate, 'dd-MM-yyyy HH:mm', { timeZone: 'America/Santiago' });
  };

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
      type: 'Date',
      valueFormatter: (params) => formatDate(params.value),
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