import "./tablaNovedad.scss"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import DataTableNO from "../../components/dataTable/DataTableNO";
import { useNavigate } from "react-router-dom";
const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDNO', headerName: 'ID', width: 40, type: 'number' },
  {
    field: 'HORANO',
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
    field: 'GUARDIANO',
    headerName: 'Guardia',
    width: 170,
    editable: false,
    type: 'string',
  }
];
const TablaNovedad = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['Novedades'],
    queryFn: () =>
      fetch(`${host_server}/TablaNovedad`).then((res) =>
        res.json(),

      ),

  });

  const navigate = useNavigate();
  
  const handleIngresarNO = () => {
    navigate("/AgregarNo");
  }

  return (
    <div className="Camiones">
      <div className="info">
        <h1 className="h1d">NOVEDADES</h1>
        <button onClick={handleIngresarNO}>Ingresar Novedad</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableNO slug="Novedades" columns={columns} rows={data} />
      )}
    </div>
  )
}

export default TablaNovedad