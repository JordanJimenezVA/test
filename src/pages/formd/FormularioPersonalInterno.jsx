import './formularioPersonal.scss'
import { useState } from "react";
import Swal from 'sweetalert2';
import Axios from "axios";
import Autosuggest from 'react-autosuggest';
const host_server = import.meta.env.VITE_SERVER_HOST;
function PersonalInterno() {
  const [suggestions, setSuggestions] = useState([]);
  const [IDPI, setidPI] = useState(0);
  const [RutPI, setRutPI] = useState("");
  const [NombrePI, setNombrePI] = useState("");
  const [ApellidoPI, setApellidoPI] = useState("");
  const [VehiculoPI, setVehiculoPI] = useState("");
  const [ColorPI, setColorPI] = useState("");
  const [PatentePI, setPatentePI] = useState("");
  const [RolPI, setRolPI] = useState("");

  const getSuggestions = async (value) => {
    try {
      const response = await fetch(`${host_server}/FormularioPersonalInterno/suggestions?query=${value}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const ruts = data.results[0].map(obj => obj.RUTPI);
        setSuggestions(ruts);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };

  const onSuggestionSelected = async (_, { suggestion }) => {
    try {
      const response = await Axios.get(`${host_server}/FormularioPersonalInterno/suggestion/${suggestion}`);
      const data = response.data;
 
      setNombrePI(data.NOMBREPI);
      setApellidoPI(data.APELLIDOPI);
      setVehiculoPI(data.VEHICULOPI);
      setColorPI(data.COLORPI);
      setPatentePI(data.PATENTEPI);
      setRolPI(data.ROLPI);
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };


  const inputProps = {
    placeholder: "Ingrese RUT",
    value: RutPI,
    onChange: (_, { newValue }) => setRutPI(newValue),
  };

  const ingresoformdPI = () => {
    Axios.post(`${host_server}/FormularioPersonalInterno`, {
      rutPI: RutPI,
      NombrePI: NombrePI,
      ApellidoPI: ApellidoPI,
      VehiculoPI: VehiculoPI,
      ColorPI: ColorPI,
      PatentePI: PatentePI,
      // ObservacionesPI: ObservacionesPI,
      RolPI: RolPI
    }).then(() => {

      limpiarcamposPI();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Personal Interno ingresado con Exito',
        timer: 1500
      })
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error))
      });
    });
  }


  const limpiarcamposPI = () => {
    setRutPI("");
    setNombrePI("");
    setApellidoPI("");
    setVehiculoPI("");
    setColorPI("");
    setPatentePI("");
    // setObservacionesPI("");
    setRolPI("");
  }


  return (

    <div className="contenedor">
      <h1 className='h1formd'>Entrada Personal Interno</h1>
      <div className="formulariopx">
        <div className="campopersonal">
          <label>Rut</label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
          <label>Nombre</label>
          <input type="text" onChange={(event) => { setNombrePI(event.target.value); }} value={NombrePI} placeholder='Ingrese Nombre' className='form-control' id={NombrePI} name={NombrePI} />
          <label>Apellido</label>
          <input type="text" onChange={(event) => { setApellidoPI(event.target.value); }} value={ApellidoPI} placeholder='Ingrese Apellido' className='form-control' id={ApellidoPI} name={ApellidoPI} />

          <label>Rol</label>
          <select onChange={(event) => { setRolPI(event.target.value); }} value={RolPI} className='form-control' id={RolPI} name={RolPI}>
            <option value=""></option>
            <option value="Administrativo">Administrativo</option>
            <option value="Bodega">Bodega</option>
          </select>
          </div>
          <div className='columnaPersonal'>
          <label>Vehiculo</label>
          <input type="text" onChange={(event) => { setVehiculoPI(event.target.value); }} value={VehiculoPI} placeholder='Ingrese Vehiculo' className='form-control' id={VehiculoPI} name={VehiculoPI} />
          <label>Patente</label>
          <input type="text" onChange={(event) => { setPatentePI(event.target.value); }} value={PatentePI} placeholder='Ingrese Patente' className='form-control' id={PatentePI} name={PatentePI} />

          <label>Color</label>
          <input type="text" onChange={(event) => { setColorPI(event.target.value); }} value={ColorPI} placeholder='Ingrese Color' className='form-control' id={ColorPI} name={ColorPI} />
         

        </div>


      </div>
      <div className='div-btn-container'>
      <button className='btn btn-success' onClick={ingresoformdPI}>Marcar Ingreso</button>
      </div>
    </div>

  )
}
export default PersonalInterno;