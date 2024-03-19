import './formularioD.scss'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Axios, { } from "axios";
import Autosuggest from "react-autosuggest";

function FormularioPersonalExterno() {
  const [suggestions, setSuggestions] = useState([]);
  const [IDPE, setidPE] = useState(0);
  const [RutPE, setRutPE] = useState("");
  const [NombrePE, setNombrePE] = useState("");
  const [ApellidoPE, setApellidoPE] = useState("");
  const [VehiculoPE, setVehiculoPE] = useState("");
  const [ColorPE, setColorPE] = useState("");
  const [PatentePE, setPatentePE] = useState("");
  const [EmpresaPE, setEmpresaPE] = useState("");
  const [RolPE, setRolPE] = useState("Jardines");



  const getSuggestions = async (value) => {
    const response = await fetch(`http://localhost:8800/FormularioPersonalExterno/suggestions?query=${value}`);
    const data = await response.json();
    return data.suggestions;
  };


  const onSuggestionSelected = async (_, { suggestion }) => {
    // Realiza una llamada a la API para obtener los datos del Rut seleccionado
    const response = await Axios.get(`http://localhost:8800/FormularioPersonalExterno/suggestion/${suggestion}`);
    const data = response.data;
    console.log("Suggestion selected:", suggestion);
    console.log("API Response:", data);
    setNombrePE(data.NOMBREPE);
    setApellidoPE(data.APELLIDOPE);
    setVehiculoPE(data.VEHICULOPE);
    setColorPE(data.COLORPE);
    setPatentePE(data.PATENTEPE);
    setEmpresaPE(data.EMPRESAPE);
    setRolPE(data.ROLPE);
  };

  const inputProps = {
    placeholder: "Ingrese RUT",
    value: RutPE,
    onChange: (_, { newValue }) => setRutPE(newValue),
  };

  const ingresoformdPE = () => {
    Axios.post("http://localhost:8800/FormularioPersonalExterno", {
      rutPE: RutPE,
      NombrePE: NombrePE,
      ApellidoPE: ApellidoPE,
      VehiculoPE: VehiculoPE,
      ColorPE: ColorPE,
      PatentePE: PatentePE,
      EmpresaPE: EmpresaPE,
      RolPE: RolPE
    }).then(() => {
      limpiarcamposPE();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Personal Externo ingresado con Exito',
        timer: 1500
      })
    }).catch(function (error) {
      let errorMessage = "Ocurrió un error al intentar marcar el ingreso.";
      if (error.response) {
        if (error.response.status === 200) {
          // El servidor respondió con un código 200 pero con un mensaje de error en el cuerpo
          errorMessage = error.response.data.message || "Error desconocido";
        } else {
          // El servidor respondió con un código de error diferente a 200
          errorMessage = `Error del servidor: ${error.response.status} - ${error.response.statusText}`;
        }
      } else if (error.request) {
        // La petición fue realizada pero no se recibió respuesta
        errorMessage = "No se recibió respuesta del servidor.";
      } else {
        // Error en la configuración de la petición
        errorMessage = "Error en la configuración de la petición.";
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage
      });
    });
  }

  const limpiarcamposPE = () => {
    setRutPE("");
    setNombrePE("");
    setApellidoPE("");
    setVehiculoPE("");
    setColorPE("");
    setPatentePE("");
    setEmpresaPE("");
    setRolPE("");
  }


  return (

    <div className="contenedor">
      <h1 className='h1formd'>Entrada Personal Externo</h1>
      <div className="formulariopx">
        <div className="campus">
          <label>Rut</label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={async ({ value }) => {
              const suggestions = await getSuggestions(value);
              setSuggestions(suggestions);
            }}
            onSuggestionsClearRequested={() => {
              setSuggestions([]);
            }}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
          {/* <input type="text" onChange={(event) => { setRutPE(event.target.value); }} value={RutPE} placeholder='Ingrese RUT' className='form-control' id={RutPE} name={RutPE} /> */}
          <label>Nombre</label>
          <input type="text" onChange={(event) => { setNombrePE(event.target.value); }} value={NombrePE} placeholder='Ingrese Nombre' className='form-control' id={NombrePE} name={NombrePE} />
          <label>Apellido</label>
          <input type="text" onChange={(event) => { setApellidoPE(event.target.value); }} value={ApellidoPE} placeholder='Ingrese Apellido' className='form-control' id={ApellidoPE} name={ApellidoPE} />
          <label>Vehiculo</label>
          <input type="text" onChange={(event) => { setVehiculoPE(event.target.value); }} value={VehiculoPE} placeholder='Ingrese Vehiculo' className='form-control' id={VehiculoPE} name={VehiculoPE} />
          <label>Color</label>
          <input type="text" onChange={(event) => { setColorPE(event.target.value); }} value={ColorPE} placeholder='Ingrese Color' className='form-control' id={ColorPE} name={ColorPE} />
          <label>Patente</label>
          <input type="text" onChange={(event) => { setPatentePE(event.target.value); }} value={PatentePE} placeholder='Ingrese Patente' className='form-control' id={PatentePE} name={PatentePE} />
          <label>Empresa</label>
          <input type="text" onChange={(event) => { setEmpresaPE(event.target.value); }} value={EmpresaPE} placeholder='Ingrese Empresa' className='form-control' id={EmpresaPE} name={EmpresaPE} />
          <label>Rol</label>
          <select onChange={(event) => { setRolPE(event.target.value); }} value={RolPE} className='form-control' id={RolPE} name={RolPE}>
            <option value="Jardines">Jardines</option>
            <option value="Fumigación">Fumigación</option>
            <option value="Camiones">Camiones</option>
            <option value="Reciclaje">Reciclaje</option>
            <option value="Otros">Otros</option>
          </select>
        </div>


      </div>
      <button className='btn btn-success' onClick={ingresoformdPE}>Marcar Ingreso</button>
    </div>

  )
}
export default FormularioPersonalExterno;