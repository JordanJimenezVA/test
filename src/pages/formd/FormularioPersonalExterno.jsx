import './formularioPersonal.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios, { } from "axios";
import Autosuggest from "react-autosuggest";
import useChileanTime from "../../hooks/UseChileanTime";

function FormularioPersonalExterno() {
  const chileanTime = useChileanTime();
  const [suggestions, setSuggestions] = useState([]);
  const [RutPE, setRutPE] = useState("");
  const [NombrePE, setNombrePE] = useState("");
  const [ApellidoPE, setApellidoPE] = useState("");
  const [VehiculoPE, setVehiculoPE] = useState("");
  const [ColorPE, setColorPE] = useState("");
  const [PatentePE, setPatentePE] = useState("");
  const [EmpresaPE, setEmpresaPE] = useState("");
  const [RolPE, setRolPE] = useState("");
  const [ObservacionesPE, setObservacionesPE] = useState("");
  const [rutValido, setRutValido] = React.useState(true);
  const [mensajeEstado, setMensajeEstado] = useState('');
  const host_server = import.meta.env.VITE_SERVER_HOST;

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
    setRutPE(newValue);
    setRutValido(validarRut(newValue));
  }

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
    }
  };

  const onSuggestionSelected = async (_, { suggestion }) => {
    try {
      const response = await Axios.get(`${host_server}/FormularioPersonalExterno/suggestion/${suggestion}`);
      const data = response.data;

      let mensajeEstado = '';
      if (data.ESTADONG) {
        switch (data.ESTADONG) {
          case 'PERMS1':
            mensajeEstado = 'ENTRAR CON PRECAUCIÓN';
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
      setNombrePE(data.NOMBREPE || '');
      setApellidoPE(data.APELLIDOPE || '');
      setVehiculoPE(data.VEHICULOPE || '');
      setColorPE(data.COLORPE || '');
      setPatentePE(data.PATENTEPE || '');
      setEmpresaPE(data.EMPRESAPE || '');
      setRolPE(data.ROLPE || '');
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };


  const inputProps = {
    placeholder: "Ingrese RUT",
    value: RutPE,
    onChange: (_, { newValue }) => setRutPE(newValue),
  };

  const confirmIngreso = () => {
    if (mensajeEstado) {
      Swal.fire({
        title: '¿Estás seguro del ingreso de esta persona?',
        text: 'Esta persona tiene el estado: ' + mensajeEstado,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ingresar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ingresoformdPE();
        }
      });
    } else {
      ingresoformdPE();
    }
  };
  
  const ingresoformdPE = () => {
    if (!validarRut(RutPE)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "RUT inválido. Por favor, ingrese un RUT válido.",
      });
      return;
    }

    Axios.post(`${host_server}/FormularioPersonalExterno`, {
      rutPE: RutPE,
      NombrePE: NombrePE,
      ApellidoPE: ApellidoPE,
      VehiculoPE: VehiculoPE,
      ColorPE: ColorPE,
      PatentePE: PatentePE,
      EmpresaPE: EmpresaPE,
      RolPE: RolPE,
      ObservacionesPE: ObservacionesPE,
      fechaActualChile: chileanTime
    }).then(() => {
      limpiarcamposPE();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Personal Externo ingresado con Exito',
        timer: 1500
      });
    }).catch(function (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Cuidado",
          text: error.response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Intente mas tarde",
        });
      }
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
    setObservacionesPE("");
  }
  const limpiarCampo = (setState) => {
    setState("");
  };


  return (
    <form onSubmit={(e) => {
      e.preventDefault(); // Evita que se recargue la página
      confirmIngreso();
    }}>
      <h1 className='h1formd'>Entrada Personal Externo</h1>
      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">
                Datos Personal Externo
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


              <label htmlFor='rutpe-input'>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
              <div className="input-group mb-3">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                  inputProps={{
                    placeholder: "Ingrese RUT",
                    value: RutPE,
                    id:"rutpe-input",
                    onChange: handleRutChange,
                  }}
                  onSuggestionSelected={onSuggestionSelected}

                />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutPE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='nombrepe-input'>Nombre</label>
              <div className="input-group mb-3">
                <input required type="text" className="form-control" onChange={(event) => { setNombrePE(event.target.value); }} value={NombrePE} placeholder='Ingrese Nombre' id="nombrepe-input" name={NombrePE} ></input>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombrePE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='apellidope-input'>Apellido</label>
              <div className="input-group mb-3">
                <input required type="text" onChange={(event) => { setApellidoPE(event.target.value); }} value={ApellidoPE} placeholder='Ingrese Apellido' className='form-control' id="apellidope-input" name={ApellidoPE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoPE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='empresape-input'>Empresa</label>
              <div className="input-group mb-3">
                <input required type="text" onChange={(event) => { setEmpresaPE(event.target.value); }} value={EmpresaPE} placeholder='Ingrese Empresa' className='form-control' id="empresape-input" name={EmpresaPE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setEmpresaPE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='rolpe-input'>Rol</label>
              <div className="input-group mb-3">
                <select required onChange={(event) => { setRolPE(event.target.value); }} value={RolPE} placeholder="Seleccione una opcion" className='form-select ' id="rolpe-input" name={RolPE}>
                  <option value="">Seleccionar una opción</option>
                  <option value="Jardines">Jardines</option>
                  <option value="Fumigación">Fumigación</option>
                  <option value="Camiones">Camiones</option>
                  <option value="Reciclaje">Reciclaje</option>
                  <option value="Peoneta">Peoneta</option>
                  <option value="Otros">Otros</option>
                </select>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRolPE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='observacionespe-input'>Observaciones</label>
              <div className="input-group mb-3">
                <input type="text" required={mensajeEstado !== ''} onChange={(event) => { setObservacionesPE(event.target.value); }} value={ObservacionesPE} placeholder='Ingrese Observaciones' className='form-control' id="observacionespe-input" name={ObservacionesPE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setObservacionesPE)}>X</button>
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
              <label htmlFor='vehiculope-input'>Vehiculo</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setVehiculoPE(event.target.value); }} value={VehiculoPE} placeholder='Ingrese Vehiculo' className='form-control' id="vehiculope-input" name={VehiculoPE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setVehiculoPE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='patentepe-input'>Patente</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setPatentePE(event.target.value); }} value={PatentePE} placeholder='Ingrese Patente' className='form-control' id="patentepe-input" name={PatentePE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatentePE)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='colorpe-input'>Color</label>
              <div className="input-group mb-3">
                <input type="text" onChange={(event) => { setColorPE(event.target.value); }} value={ColorPE} placeholder='Ingrese Color' className='form-control' id="colorpe-input" name={ColorPE} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setColorPE)}>X</button>
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
export default FormularioPersonalExterno;