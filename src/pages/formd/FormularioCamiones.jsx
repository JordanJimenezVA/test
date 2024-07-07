import './formularioD.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios, { } from "axios";
import Autosuggest from 'react-autosuggest';
import useChileanTime from "../../hooks/UseChileanTime";
import { useAuth } from '../../hooks/Auth';
const host_server = import.meta.env.VITE_SERVER_HOST;

function FormularioCamiones() {
  const { nombreUsuario } = useAuth();
  const chileanTime = useChileanTime();
  const [suggestions, setSuggestions] = useState([]);
  const [IDCA, setIDCA] = useState(0);
  const [ChoferCA, setChoferCA] = useState("");
  const [ApellidoChoferCA, setApellidoChoferCA] = useState("");
  const [RutCA, setRutCA] = useState("");
  const [PatenteCA, setPatenteCA] = useState("");
  const [MarcaCA, setMarcaCA] = useState("");
  const [TipoCA, setTipoCA] = useState("");
  const [ModeloCA, setModeloCA] = useState("");
  const [ColorCA, setColorCA] = useState("");
  const [EmpresaCA, setEmpresaCA] = useState("");
  const [ObservacionesCA, setObservacionesCA] = useState("");
  const [GuiaDespachoCA, setGuiaDespachoCA] = useState("");
  const [SelloCA, setSelloCA] = useState("");
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
    setRutCA(newValue);
    setRutValido(validarRut(newValue)); // Validar el RUT al cambiar
  }


  const getSuggestions = async (value) => {
    try {
      const response = await fetch(`${host_server}/FormularioCamiones/suggestions?query=${value}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const ruts = data.results[0].map(obj => obj.RUTCA);
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
      const response = await Axios.get(`${host_server}/FormularioCamiones/suggestion/${suggestion}`);
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

      setRutCA(data.RUTCA || ""),
        setChoferCA(data.CHOFERCA || ""),
        setApellidoChoferCA(data.APELLIDOCHOFERCA || ""),
        setPatenteCA(data.PATENTECA || ""),
        setMarcaCA(data.MARCACA || ""),
        setTipoCA(data.TIPOCA || ""),
        setModeloCA(data.MODELOCA || ""),
        setColorCA(data.COLORCA || ""),
        setEmpresaCA(data.EMPRESACA || ""),
        setObservacionesCA(data.OBSERVACIONESCA || ""),
        setGuiaDespachoCA(data.GUIADESPACHOCA || "")
      setSelloCA(data.SELLOCA || "")
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };

  const inputProps = {
    placeholder: "Ingrese RUT",
    value: RutCA,
    onChange: (_, { newValue }) => setRutCA(newValue),
  };

  const ingresoformdCA = () => {
    if (!validarRut(RutCA)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "RUT inválido. Por favor, ingrese un RUT válido.",
      });
      return;
    }
    Axios.post(`${host_server}/FormularioCamiones`, {
      ChoferCA: ChoferCA,
      ApellidoChoferCA: ApellidoChoferCA,
      RutCA: RutCA,
      PatenteCA: PatenteCA,
      MarcaCA: MarcaCA,
      TipoCA: TipoCA,
      ModeloCA: ModeloCA,
      ColorCA: ColorCA,
      EmpresaCA: EmpresaCA,
      ObservacionesCA: ObservacionesCA,
      GuiaDespachoCA: GuiaDespachoCA,
      SelloCA: SelloCA,
      fechaActualChile: chileanTime,
      NombreUsuario: nombreUsuario
    }).then(() => {
      limpiarcamposCA();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Camion ingresado con Exito',
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


  const limpiarcamposCA = () => {
    setChoferCA("");
    setApellidoChoferCA("");
    setRutCA("");
    setPatenteCA("");
    setMarcaCA("");
    setTipoCA("");
    setModeloCA("");
    setColorCA("");
    setEmpresaCA("");
    setObservacionesCA("");
    setGuiaDespachoCA("");
    setSelloCA("");
  }
  const limpiarCampo = (setState) => {
    setState("");
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
        ingresoformdCA();
      }
    }}>
      <h1 className='h1formd'>Entrada Camión</h1>
      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">
                Datos Camión
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

        <div className="card-body">
          <div className="row g-3 needs-validation">


            <div className="col-auto">


              <label htmlFor='rutca-input'>Rut Chofer{rutValido ? null : <span style={{ color: "red" }}> RUT inválido</span>}</label>
              <div className="input-group ">

                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                  inputProps={{
                    placeholder: "Ingrese RUT",
                    value: RutCA,
                    id:"rutca-input",
                    onChange: handleRutChange,
                  }}
                  onSuggestionSelected={onSuggestionSelected}
                />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutCA)}>X</button>
              </div>

            </div>

            <div className="col-md-3">
              <label htmlFor='choferca-input'>Nombre Chofer</label>
              <div className="input-group ">
                <input required type="text" className="form-control" onChange={(event) => { setChoferCA(event.target.value); }} value={ChoferCA} placeholder='Ingrese Nombre' id="choferca-input" name={ChoferCA} ></input>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setChoferCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='apellidoca-input'>Apellido Chofer</label>
              <div className="input-group ">

                <input required type="text" onChange={(event) => { setApellidoChoferCA(event.target.value); }} value={ApellidoChoferCA} placeholder='Ingrese Apellido' className='form-control' id="apellidoca-input" name={ApellidoChoferCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoChoferCA)}>X</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos del Camión<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">
          <div className="row g-3 needs-validation">

            <div className="col-md-3">
              <label htmlFor='tipoca-input'>Tipo</label>
              <div className="input-group mb-3">

                <select required onChange={(event) => { setTipoCA(event.target.value); }} value={TipoCA} className='form-select' id="tipoca-input" name={TipoCA}>
                  <option value="">Seleccionar una opción</option>
                  <option value="SEMIREMOLQUE">SEMIREMOLQUE</option>
                  <option value="CAMION">CAMION</option>
                  <option value="TRACTOCAMION">TRACTOCAMION</option>
                  <option value="CHASIS CABINADO">CHASIS CABINADO</option>
                  <option value="REMOLQUE">REMOLQUE</option>
                  <option value="CHASIS CABINADO">CHASIS CABINADO</option>
                  <option value="OtrosCA">Otros</option>
                </select>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setTipoCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='modeloca-input'>Modelo</label>
              <div className="input-group mb-3">
                <input required type="text" onChange={(event) => { setModeloCA(event.target.value); }} value={ModeloCA} placeholder='Ingrese Modelo' className='form-control' id="modeloca-input" name={ModeloCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setModeloCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='colorca-input'>Color</label>
              <div className="input-group mb-3">

                <input required type="text" onChange={(event) => { setColorCA(event.target.value); }} value={ColorCA} placeholder='Ingrese Color' className='form-control' id="colorca-input" name={ColorCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setColorCA)}>X</button>
              </div>
            </div>
          </div>


          <div className="row g-3 needs-validation">
            <div className="col-md-3">
              <label htmlFor='patenteca-input'>Patente Rampa</label>
              <div className="input-group ">

                <input required type="text" onChange={(event) => { setPatenteCA(event.target.value); }} value={PatenteCA} placeholder='Ingrese Patente' className='form-control' id="patenteca-input" name={PatenteCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatenteCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='marcaca-input'>Marca</label>
              <div className="input-group ">

                <input required type="text" onChange={(event) => { setMarcaCA(event.target.value); }} value={MarcaCA} placeholder='Ingrese Marca' className='form-control' id="marcaca-input" name={MarcaCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setMarcaCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='empresape-input'>Empresa</label>
              <div className="input-group ">

                <input required type="text" onChange={(event) => { setEmpresaCA(event.target.value); }} value={EmpresaCA} placeholder='Ingrese Empresa' className='form-control' id="empresape-input" name={EmpresaCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setEmpresaCA)}>X</button>
              </div>
            </div>




          </div>
        </div>
      </div>

      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Despacho<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">
          <div className="row g-3 needs-validation">

            <div className="col-md-3">
              <label htmlFor='guiaca-input'>N° Planilla Transporte</label>
              <div className="input-group ">

                <input required type="text" onChange={(event) => { setGuiaDespachoCA(event.target.value); }} value={GuiaDespachoCA} placeholder='Planilla Transporte' className='form-control' id="guiaca-input" name={GuiaDespachoCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setGuiaDespachoCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='obsca-input'>Observaciones</label>
              <div className="input-group ">

                <input type="text" required={mensajeEstado !== ''} onChange={(event) => { setObservacionesCA(event.target.value); }} value={ObservacionesCA} placeholder='Observaciones' className='form-control' id="obsca-input" name={ObservacionesCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setObservacionesCA)}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='selloca-input'>Sello</label>
              <div className="input-group ">

                <input type="text" onChange={(event) => { setSelloCA(event.target.value); }} value={SelloCA} placeholder='Ingrese Sello' className='form-control' required id="selloca-input" name={SelloCA} />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setSelloCA)}>X</button>
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
export default FormularioCamiones;