import './formularioPersonal.scss'
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
import Autosuggest from 'react-autosuggest';
import useChileanTime from "../../hooks/UseChileanTime";

const host_server = import.meta.env.VITE_SERVER_HOST;

function PersonalInterno() {
  const chileanTime  = useChileanTime();
  const [suggestions, setSuggestions] = useState([]);
  const [IDPI, setidPI] = useState(0);
  const [RutPI, setRutPI] = useState("");
  const [NombrePI, setNombrePI] = useState("");
  const [ApellidoPI, setApellidoPI] = useState("");
  const [VehiculoPI, setVehiculoPI] = useState("");
  const [ColorPI, setColorPI] = useState("");
  const [PatentePI, setPatentePI] = useState("");
  const [RolPI, setRolPI] = useState("");
  const [ObservacionesPI, setObservacionesPI] = useState("");
  const [rutValido, setRutValido] = React.useState(true);

  const validarRut = (rut) => {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
    let tmp = rut.split('-');
    let digv = tmp[1];
    rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (dv(rut) == digv);
  }

  const dv = (T) => {
    let M = 0, S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'k';
  }

  const handleRutChange = (event, { newValue }) => {
    setRutPI(newValue);
    setRutValido(validarRut(newValue)); // Validar el RUT al cambiar
  }

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
    if (!validarRut(RutPI)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "RUT inválido. Por favor, ingrese un RUT válido.",
      });
      return;
    }
    Axios.post(`${host_server}/FormularioPersonalInterno`, {
      rutPI: RutPI,
      NombrePI: NombrePI,
      ApellidoPI: ApellidoPI,
      VehiculoPI: VehiculoPI,
      ColorPI: ColorPI,
      PatentePI: PatentePI,
      ObservacionesPI: ObservacionesPI,
      RolPI: RolPI,
      fechaActualChile: chileanTime.chileanTime
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
    setObservacionesPI("");
    setRolPI("");
  }

  const limpiarCampo = (setState) => {
    setState("");
  };




  return (

    <form onSubmit={(e) => {
      e.preventDefault(); // Evita que se recargue la página
      ingresoformdPI();
    }}>
      <h1 className='h1formd'>Entrada Personal Interno</h1>
      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Personal Interno<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">

          <div className="row g-3 needs-validation">

            <div className="col-auto">


              <label>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
              <div className="input-group mb-3">

                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                  inputProps={{
                    placeholder: "Ingrese RUT",
                    value: RutPI,
                    onChange: handleRutChange,
                  }}
                  onSuggestionSelected={onSuggestionSelected}
                />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label>Nombre</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(event) => { setNombrePI(event.target.value); }} value={NombrePI} placeholder='Ingrese Nombre' id={NombrePI} name={NombrePI} ></input>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombrePI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label>Apellido</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setApellidoPI(event.target.value); }} value={ApellidoPI} placeholder='Ingrese Apellido' className='form-control' id={ApellidoPI} name={ApellidoPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label>Rol</label>
              <div className="input-group mb-3">
                <select onChange={(event) => { setRolPI(event.target.value); }} value={RolPI} className='form-select ' id={RolPI} name={RolPI}>
                  <option value=""></option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Bodega">Bodega</option>
                </select>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRolPI)}>X</button>
              </div>
            </div>
            
            <div className="col-md-3">
              <label>Observaciones</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setObservacionesPI(event.target.value); }} value={ObservacionesPI} placeholder='Ingrese Observaciones' className='form-control' id={ObservacionesPI} name={ObservacionesPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setObservacionesPI)}>X</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos del Vehículo<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">

          <div className="row g-3 needs-validation">
            <div className="col-md-3">
              <label>Vehiculo</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setVehiculoPI(event.target.value); }} value={VehiculoPI} placeholder='Ingrese Vehiculo' className='form-control' id={VehiculoPI} name={VehiculoPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setVehiculoPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label>Patente</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setPatentePI(event.target.value); }} value={PatentePI} placeholder='Ingrese Patente' className='form-control' id={PatentePI} name={PatentePI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatentePI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label>Color</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setColorPI(event.target.value); }} value={ColorPI} placeholder='Ingrese Color' className='form-control' id={ColorPI} name={ColorPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setColorPI)}>X</button>
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="div-btn-container">
        <button className='btn btn-success' type='submit'>Marcar Ingreso</button>


      </div>
    </form>
  )
}
export default PersonalInterno;