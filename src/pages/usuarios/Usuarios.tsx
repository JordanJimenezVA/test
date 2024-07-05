import { GridColDef } from "@mui/x-data-grid";
import "./usuarios.scss"
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DataTableU from "../../components/dataTable/DataTableU"

const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDU', headerName: 'ID', width: 70, type: 'number' },
  { field: 'RUTU', headerName: 'Rut', type: 'string', width: 150 },
  { field: 'NOMBREU', headerName: 'Nombre', type: 'string', width: 250 },
  { field: 'TIPOU', headerName: 'Tipo', type: 'string', width: 250 },
];

const Usuarios = () => {

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['usuarios'],
    queryFn: () =>
      fetch(`${host_server}/usuarios`).then((res) =>
        res.json(),
      ),
  })


  const handleIngresarU = () => {
    navigate(`/AgregarUsuario`);
  }
  const rows = data?.map((row: any) => ({
    ...row,
  })) || [];

  return (
    <div className="USUARIOS">
      <div className="info">
        <h1 className="h1d">Usuarios</h1>

        <button onClick={handleIngresarU}>Ingresar Usuarios</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTableU slug="usuarios" columns={columns} rows={rows} />
      )}

    </div>
  )
}

export default Usuarios