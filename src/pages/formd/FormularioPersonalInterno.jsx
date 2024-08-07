import './formularioPersonal.scss'
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
import Autosuggest from 'react-autosuggest';
import useChileanTime from "../../hooks/UseChileanTime";
import { useAuth } from '../../hooks/Auth';
const host_server = import.meta.env.VITE_SERVER_HOST;

function FormularioPersonalInterno() {
  const { nombreUsuario } = useAuth();
  const chileanTime = useChileanTime();
  const [suggestions, setSuggestions] = useState([]);
  const [RutPI, setRutPI] = useState("");
  const [NombrePI, setNombrePI] = useState("");
  const [ApellidoPI, setApellidoPI] = useState("");
  const [VehiculoPI, setVehiculoPI] = useState("");
  const [ColorPI, setColorPI] = useState("");
  const [PatentePI, setPatentePI] = useState("");
  const [RolPI, setRolPI] = useState("");
  const [ObservacionesPI, setObservacionesPI] = useState("");
  const [mensajeEstado, setMensajeEstado] = useState('');
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

      let mensajeEstado = '';
      if (data.ESTADONG) {
        switch (data.ESTADONG) {
          case 'PERMS1':
            mensajeEstado = 'DEBE TENER PRECAUCIÓN PARA ENTRAR';
            break;
          case 'PERMS2':
            mensajeEstado = 'SOLICITAR PERMISO PARA ENTRAR';
            break;
          case 'NOACCESO':
            mensajeEstado = 'PROHIBIDO EL ACCESO';
            break;
          default:
            mensajeEstado = '';
        }
      }

      setMensajeEstado(mensajeEstado);
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
      RUTPI: RutPI,
      NOMBREPI: NombrePI,
      APELLIDOPI: ApellidoPI,
      VEHICULOPI: VehiculoPI,
      COLORPI: ColorPI,
      PATENTEPI: PatentePI,
      OBSERVACIONESPI: ObservacionesPI,
      ROLPI: RolPI,
      fechaActualChile: chileanTime,
      NombreUsuarioI: nombreUsuario


    }).then(() => {
      limpiarcamposPI();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Personal Interno ingresado con Exito',
        timer: 1500
      })
    }).catch(function (error) {
      const errorMsg = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error desconocido. Intente más tarde';
      Swal.fire({
        icon: "error",
        title: "Cuidado...",
        text: errorMsg
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


  const handlePatenteChange = (event) => {
    const value = event.target.value.toUpperCase();
    setPatentePI(value);
  };

  return (

    <form onSubmit={(e) => {
      e.preventDefault(); // Evita que se recargue la página
      if (mensajeEstado === 'PROHIBIDO EL ACCESO') {
        Swal.fire({
          icon: 'error',
          title: 'Prohibido el acceso',
          text: 'Este personal no tiene permitido el ingreso.',
        });
      } else {
        ingresoformdPI();
      }
    }}>
      <h1 className='h1formd'>Entrada Personal Interno</h1>
      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">
                Datos Personal Interno
                {mensajeEstado && (
                  <span style={{ color: mensajeEstado === 'PROHIBIDO EL ACCESO' ? 'red' : 'orange', marginLeft: '10px' }}>
                    {mensajeEstado}
                  </span>
                )}
                <a className="anchorjs-link" aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a>
              </h4>
            </div>
          </div>
        </div>

        <div className="card-body ">

          <div className="row g-3 needs-validation">

            <div className="col-auto">


              <label htmlFor='rutformpi-input'>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
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
                    id: "rutformpi-input",
                    onChange: handleRutChange,
                  }}
                  onSuggestionSelected={onSuggestionSelected}
                />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='nombrepi-input'>Nombre</label>
              <div className="input-group mb-3">
                <input required type="text" className="form-control" onChange={(event) => { setNombrePI(event.target.value); }} value={NombrePI} placeholder='Ingrese Nombre' id="nombrepi-input" name={NombrePI} ></input>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombrePI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='apellidopi-input'>Apellido</label>
              <div className="input-group mb-3">
                <input required type="text" onChange={(event) => { setApellidoPI(event.target.value); }} value={ApellidoPI} placeholder='Ingrese Apellido' className='form-control' id="apellidopi-input" name={ApellidoPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='rolpi-input'>Rol</label>
              <div className="input-group mb-3">
                <select required onChange={(event) => { setRolPI(event.target.value); }} value={RolPI} className='form-select ' id="rolpi-input" name={RolPI}>
                  <option value="">Seleccionar una opción</option>
                  <option value="Administrativo Existencias">Administrativo Existencias</option>
                  <option value="Administrativo de Distribución">Administrativo de Distribución</option>
                  <option value="Administrativo Congelados">Administrativo Congelados</option>
                  <option value="Jefe de Sucursal">Jefe de Sucursal</option>
                  <option value="Jefe Comercial">Jefe Comercial</option>
                  <option value="Jefe de Distribución">Jefe de Distribución</option>
                  <option value="Coordinador Trade Marketing">Coordinador Trade Marketing</option>
                  <option value="Supervisor de Distribución">Supervisor de Distribución</option>
                  <option value="Supevisor Ventas">Supevisor Ventas</option>
                  <option value="Cajero">Cajero</option>
                  <option value="Secretaria">Secretaria</option>
                  <option value="Movilizador">Movilizador</option>
                  <option value="Gruero">Gruero</option>
                  <option value="Despachador">Despachador</option>
                  <option value="Recepcionista">Recepcionista</option>
                </select>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRolPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='observacionespi-input'>Observaciones</label>
              <div className="input-group mb-3">
                <input type="text" required={mensajeEstado !== ''} onChange={(event) => { setObservacionesPI(event.target.value); }} value={ObservacionesPI} placeholder='Ingrese Observaciones' className='form-control' id="observacionespi-input" name={ObservacionesPI} />
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
              <label htmlFor='vehiculopi-input'>Vehiculo</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setVehiculoPI(event.target.value); }} value={VehiculoPI} placeholder='Ingrese Vehiculo' className='form-control' id="vehiculopi-input" name={VehiculoPI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setVehiculoPI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='patentepi-input'>Patente</label>
              <div className="input-group mb-3">
                <input type="text" onChange={handlePatenteChange} value={PatentePI} placeholder='Ingrese Patente' className='form-control' id="patentepi-input" name={PatentePI} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatentePI)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='colorpi-input'>Color</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setColorPI(event.target.value); }} value={ColorPI} placeholder='Ingrese Color' className='form-control' id="colorpi-input" name={ColorPI} />
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
export default FormularioPersonalInterno;