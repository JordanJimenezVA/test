import "./tablaNovedad.scss"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import DataTableNO from "../../components/dataTable/DataTableNO";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const host_server = import.meta.env.VITE_SERVER_HOST;

const columns: GridColDef[] = [
  { field: 'IDNO', headerName: 'ID', width: 40, type: 'number' },
  {
    field: 'HORANO',
    headerName: 'Fecha Ingreso',
    width: 180,
    editable: false,
    type: 'DATE'
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
        <Button onClick={handleIngresarNO} variant="contained" endIcon={<PersonAddIcon />} >Reportar Novedad </Button>
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