import './formularioD.scss';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Axios, { } from "axios";
import Autosuggest from 'react-autosuggest';
const host_server = import.meta.env.VITE_SERVER_HOST;

function FormularioPersonalCamiones() {
  const [suggestions, setSuggestions] = useState([]);
  const [IDPE, setidPE] = useState(0);
  const [ChoferCA, setChoferCA] = useState("");
  const [ApellidoChoferCA, setApellidoChoferCA] = useState("");
  const [RutCA, setRutCA] = useState("");
  const [PeonetaCA, setPeonetaCA] = useState("");
  const [PatenteCA, setPatenteCA] = useState("");
  const [MarcaCA, setMarcaCA] = useState("");
  const [TipoCA, setTipoCA] = useState("");
  const [ModeloCA, setModeloCA] = useState("");
  const [ColorCA, setColorCA] = useState("");
  const [EmpresaCA, setEmpresaCA] = useState("");
  const [ObservacionesCA, setObservacionesCA] = useState("");
  const [GuiaDespachoCA, setGuiaDespachoCA] = useState("");
  const [SelloCA, setSelloCA] = useState("");
  const [Empresas, setEmpresas] = useState([]);

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
      setRutCA(data.RUTCA || ""),
        setChoferCA(data.CHOFERCA || ""),
        setApellidoChoferCA(data.APELLIDOCHOFERCA || ""),
        setPeonetaCA(data.PEONETACA || ""),
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
    Axios.post(`${host_server}/FormularioCamiones`, {
      ChoferCA: ChoferCA,
      ApellidoChoferCA: ApellidoChoferCA,
      RutCA: RutCA,
      PeonetaCA: PeonetaCA,
      PatenteCA: PatenteCA,
      MarcaCA: MarcaCA,
      TipoCA: TipoCA,
      ModeloCA: ModeloCA,
      ColorCA: ColorCA,
      EmpresaCA: EmpresaCA,
      ObservacionesCA: ObservacionesCA,
      GuiaDespachoCA: GuiaDespachoCA,
      // SelloCA: SelloCA
    }).then(() => {
      limpiarcamposCA();
      Swal.fire({
        title: 'Ingreso Exitoso!',
        icon: 'success',
        text: 'Camion ingresado con Exito',
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


  const limpiarcamposCA = () => {
    setChoferCA("");
    setApellidoChoferCA("");
    setRutCA("");
    setPeonetaCA("");
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


  return (

    <div className="contenedor">
      <h1 className='h1formd'>Entrada Personal Camiones</h1>
      <div className="formulariopx">
        <div className="campo">
          <label>Rut Chofer</label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => getSuggestions(value)}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
          {/* <input type="text" onChange={(event) => { setRutCA(event.target.value); }} value={RutCA} placeholder='Ingrese Rut Chofer' className='form-control' id={RutCA} name={RutCA} /> */}
          <label>Nombre Chofer</label>
          <input type="text" onChange={(event) => { setChoferCA(event.target.value); }} value={ChoferCA} placeholder='Ingrese Chofer' className='form-control' id={ChoferCA} name={ChoferCA} />
          <label>Apellido Chofer</label>
          <input type="text" onChange={(event) => { setApellidoChoferCA(event.target.value); }} value={ApellidoChoferCA} placeholder='Ingrese Chofer' className='form-control' id={ApellidoChoferCA} name={ApellidoChoferCA} />
          <label>Nombre Peoneta's</label>
          <input type="text" onChange={(event) => { setPeonetaCA(event.target.value); }} value={PeonetaCA} placeholder='Ingrese Peoneta(s)' className='form-control' id={PeonetaCA} name={PeonetaCA} />
          <label>Guia Despacho/Factura</label>
          <input type="text" onChange={(event) => { setGuiaDespachoCA(event.target.value); }} value={GuiaDespachoCA} placeholder='Ingrese Guia Despacho/Factura' className='form-control' id={GuiaDespachoCA} name={GuiaDespachoCA} />
          <label>Observaciones</label>
          <input type="text" onChange={(event) => { setObservacionesCA(event.target.value); }} value={ObservacionesCA} placeholder='Ingrese Observaciones' className='form-control' id={ObservacionesCA} name={ObservacionesCA} />

          <label>Sello</label>
          <input type="text" onChange={(event) => { setSelloCA(event.target.value); }} value={SelloCA} placeholder='Ingrese Sello' className='form-control' id={SelloCA} name={SelloCA} />

        </div>

        <div className="columna2">
          <label>Tipo</label>
          <input type="text" onChange={(event) => { setTipoCA(event.target.value); }} value={TipoCA} placeholder='Ingrese Tipo' className='form-control' id={TipoCA} name={TipoCA} />
          <label>Modelo</label>
          <input type="text" onChange={(event) => { setModeloCA(event.target.value); }} value={ModeloCA} placeholder='Ingrese Modelo' className='form-control' id={ModeloCA} name={ModeloCA} />
          <label>Color</label>
          <input type="text" onChange={(event) => { setColorCA(event.target.value); }} value={ColorCA} placeholder='Ingrese Color' className='form-control' id={ColorCA} name={ColorCA} />

          <label>Patente</label>
          <input type="text" onChange={(event) => { setPatenteCA(event.target.value); }} value={PatenteCA} placeholder='Ingrese Patente' className='form-control' id={PatenteCA} name={PatenteCA} />
          <label>Marca</label>
          <input type="text" onChange={(event) => { setMarcaCA(event.target.value); }} value={MarcaCA} placeholder='Ingrese Marca' className='form-control' id={MarcaCA} name={MarcaCA} />


          <label>Empresa</label>
          <input type="text" onChange={(event) => { setEmpresaCA(event.target.value); }} value={EmpresaCA} placeholder='Ingrese Empresa' className='form-control' id={EmpresaCA} name={EmpresaCA} />


        </div>


      </div>
      <button className='btn btn-success' onClick={ingresoformdCA}>Marcar Ingreso</button>
    </div>

  )
}
export default FormularioPersonalCamiones;