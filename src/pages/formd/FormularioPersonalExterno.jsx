import './formularioPersonal.scss'
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
  const [RolPE, setRolPE] = useState("");
  const host_server = import.meta.env.VITE_SERVER_HOST;


  const getSuggestions = async (value) => {
    try {
      const response = await fetch(`${host_server}/FormularioPersonalExterno/suggestions?query=${value}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const ruts = data.results[0].map(obj => obj.RUTPE);
        setSuggestions(ruts);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      // console.error('Error al obtener sugerencias:', error);
    }
  };


  const onSuggestionSelected = async (_, { suggestion }) => {
    try {
      const response = await Axios.get(`${host_server}/FormularioPersonalExterno/suggestion/${suggestion}`);
      const data = response.data;
      setNombrePE(data.NOMBREPE);
      setApellidoPE(data.APELLIDOPE);
      setVehiculoPE(data.VEHICULOPE);
      setColorPE(data.COLORPE);
      setPatentePE(data.PATENTEPE);
      setEmpresaPE(data.EMPRESAPE);
      setRolPE(data.ROLPE);
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };

  const inputProps = {
    placeholder: "Ingrese RUT",
    value: RutPE,
    onChange: (_, { newValue }) => setRutPE(newValue),
  };

  const ingresoformdPE = () => {
    Axios.post(`${host_server}/FormularioPersonalExterno`, {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error))
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
          {/* <input type="text" onChange={(event) => { setRutPE(event.target.value); }} value={RutPE} placeholder='Ingrese RUT' className='form-control' id={RutPE} name={RutPE} /> */}
          <label>Nombre</label>
          <input type="text" onChange={(event) => { setNombrePE(event.target.value); }} value={NombrePE} placeholder='Ingrese Nombre' className='form-control' id={NombrePE} name={NombrePE} />
          <label>Apellido</label>
          <input type="text" onChange={(event) => { setApellidoPE(event.target.value); }} value={ApellidoPE} placeholder='Ingrese Apellido' className='form-control' id={ApellidoPE} name={ApellidoPE} />
          <label>Empresa</label>
          <input type="text" onChange={(event) => { setEmpresaPE(event.target.value); }} value={EmpresaPE} placeholder='Ingrese Empresa' className='form-control' id={EmpresaPE} name={EmpresaPE} />
          <label>Rol</label>
          <select onChange={(event) => { setRolPE(event.target.value); }} value={RolPE} className='form-control' id={RolPE} name={RolPE}>
            <option value=""></option>
            <option value="Jardines">Jardines</option>
            <option value="Fumigación">Fumigación</option>
            <option value="Camiones">Camiones</option>
            <option value="Reciclaje">Reciclaje</option>
            <option value="Otros">Otros</option>
          </select>
          </div>

          <div className='columnaPersonal'>
          <label>Vehiculo</label>
          <input type="text" onChange={(event) => { setVehiculoPE(event.target.value); }} value={VehiculoPE} placeholder='Ingrese Vehiculo' className='form-control' id={VehiculoPE} name={VehiculoPE} />
          <label>Patente</label>
          <input type="text" onChange={(event) => { setPatentePE(event.target.value); }} value={PatentePE} placeholder='Ingrese Patente' className='form-control' id={PatentePE} name={PatentePE} />

          <label>Color</label>
          <input type="text" onChange={(event) => { setColorPE(event.target.value); }} value={ColorPE} placeholder='Ingrese Color' className='form-control' id={ColorPE} name={ColorPE} />
          


        

        </div>

      </div>
      <div className='div-btn-container'>
      <button className='btn btn-success' onClick={ingresoformdPE}>Marcar Ingreso</button>
      </div>
    </div>

  )
}
export default FormularioPersonalExterno;