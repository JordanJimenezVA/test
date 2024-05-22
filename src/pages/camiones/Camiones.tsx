import "./camiones.scss"
import DataTableCA from "../../components/dataTable/DataTableCA"
import { useState } from "react";
import AddCA from "../../components/add/AddCA";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
const host_server = import.meta.env.VITE_SERVER_HOST;

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
    headerName: 'Nombre',
    width: 170,
    editable: false,
    type: 'string',
    valueGetter: (params) => `${params.row.CHOFERCA} ${params.row.APELLIDOCHOFERCA}`,
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
    width: 140,
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
  },
  {
    field: 'ESTADOCA',
    headerName: 'Estado',
    width: 100,
    type: 'string',
  }
];

const Camiones = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['camiones'],
    queryFn: () =>
    fetch(`${host_server}/camiones`).then((res) =>
        res.json(),
      ),
  })

  const handleIngresarCA = () => {
    navigate(`/AgregarCamion`);
  }
  return (
    <div className="Camiones">
      <div className="info">
          <h1 className="h1d">Camiones</h1>
          <button onClick={handleIngresarCA}>Ingresar Camiones</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTableCA slug="camiones" columns={columns} rows={data}/>
      )}
      {open && <AddCA slug="CAMIONES" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Camiones
