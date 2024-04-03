import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable"
import "./personalinterno.scss"
import {  useState } from "react";
import AddPI from "../../components/add/AddPI";
import { useQuery } from "@tanstack/react-query";
const host_server = import.meta.env.VITE_SERVER_HOST;
const columns: GridColDef[] = [
  { field: 'IDPI', headerName: 'ID', width: 90, type: 'number' },
  { field: 'RUTPI', headerName: 'Rut', type: 'string', width: 150, editable: false },
  { field: 'NOMBREPI', headerName: 'Nombre', width: 200, editable: false, type: 'string' },
  { field: 'APELLIDOPI', headerName: 'Apellido', width: 200, editable: false, type: 'string' },
  { field: 'VEHICULOPI', headerName: 'Vehiculo', width: 160, type: 'string' },
  { field: 'COLORPI', headerName: 'Color', width: 160, type: 'string' },
  { field: 'PATENTEPI', headerName: 'Patente', width: 160, type: 'string' },
  // { field: 'OBSERVACIONES', headerName: 'Observaciones', width: 160, type: 'string', hideable: true},
  { field: 'ROLPI', headerName: 'Rol', width: 200, editable: false, type: 'string' },
];

// const PersonalPI = () => {
//   const [PI, setPI] = useState ([])
//   useEffect(()=>{
//     const fetchAllPersonalPI  = async () =>{
//       try {
//         const res = await axios.get("http://localhost:8800/Personal%20Interno")
//         setPI(res.data);
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     fetchAllPersonalPI ()
//   },[]);
// }

const PersonalInterno = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery({
    queryKey: ['personalinterno'],
    queryFn: () =>
    fetch(`${host_server}/Personal%20Interno`).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className="PI">
      <div className="info">
        <h1 className="h1d">Personal Interno</h1>
        <button onClick={() => setOpen(true)}>Ingresar Personal Interno</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        < DataTable slug="Personal Interno" columns={columns} rows={data}/>
      )}
      {open && <AddPI slug="Personal Interno" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default PersonalInterno