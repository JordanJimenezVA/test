
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

function AgregarCA() {
    const [IDCA, setidCA] = useState(0);
    const [ChoferCA, setChoferCA] = useState("");
    const [ApellidoCA, setApellidoCA] = useState("");
    const [RutCA, setRutCA] = useState("");
    const [PatenteCA, setPatenteCA] = useState("");
    const [MarcaCA, setMarcaCA] = useState("");
    const [TipoCA, setTipoCA] = useState("");
    const [ModeloCA, setModeloCA] = useState("");
    const [ColorCA, setColorCA] = useState("");
    const [EmpresaCA, setEmpresaCA] = useState("");
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

    const ingresoformdCA = () => {
        if (!validarRut(RutCA)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "RUT inválido. Por favor, ingrese un RUT válido.",
            });
            return;
        }
        Axios.post(`${host_server}/AgregarCamion`, {
            ChoferCA: ChoferCA,
            ApellidoCA: ApellidoCA,
            RutCA: RutCA,
            PatenteCA: PatenteCA,
            MarcaCA: MarcaCA,
            TipoCA: TipoCA,
            ModeloCA: ModeloCA,
            ColorCA: ColorCA,
            EmpresaCA: EmpresaCA,

        }).then(() => {

            limpiarCamposCA();
            Swal.fire({
                title: 'Ingreso Exitoso!',
                icon: 'success',
                text: 'Personal Camion ingresado con Exito',
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


    const limpiarCamposCA = () => {
        setRutCA("");
        setChoferCA("");
        setApellidoCA("");
        setPatenteCA("");
        setMarcaCA("");
        setTipoCA("");
        setModeloCA("");
        setColorCA("");
        setEmpresaCA("");

    }

    const limpiarCampo = (setState) => {
        setState("");
    };




    return (

        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
            ingresoformdCA();
        }}>
            <h1 className='h1formd'>Entrada Camión</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Chofer<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row g-3 needs-validation">


                        <div className="col-auto">


                            <label htmlFor='rutca-input'>Rut Chofer{rutValido ? null : <span style={{ color: "red" }}> RUT inválido</span>}</label>
                            <div className="input-group ">
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutCA}
                                    placeholder='Ingrese Rut'
                                    id="rutca-input"
                                    name={RutCA}
                                    required
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutCA)}>X</button>
                            </div>

                        </div>

                        <div className="col-md-3">
                            <label htmlFor='choferca-input'>Nombre Chofer</label>
                            <div className="input-group ">
                                <input type="text" required className="form-control" onChange={(event) => { setChoferCA(event.target.value); }} value={ChoferCA} placeholder='Ingrese Nombre' id="choferca-input" name={ChoferCA} ></input>
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setChoferCA)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='apellidoca-input'>Apellido Chofer</label>
                            <div className="input-group ">
                                <input type="text" required onChange={(event) => { setApellidoCA(event.target.value); }} value={ApellidoCA} placeholder='Ingrese Apellido' className='form-control' id="apellidoca-input" name={ApellidoCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoCA)}>X</button>
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
                                    <option value="Remolque Abierto">Remolque Abierto</option>
                                    <option value="Remolque Cerrado">Remolque Cerrado</option>
                                    <option value="Remolque Refrigerado">Remolque Refrigerado</option>
                                    <option value="Otros">Otros</option>
                                </select>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setTipoCA)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='modeloca-input'>Modelo</label>
                            <div className="input-group mb-3">
                                <input type="text" required onChange={(event) => { setModeloCA(event.target.value); }} value={ModeloCA} placeholder='Ingrese Modelo' className='form-control' id="modeloca-input" name={ModeloCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setModeloCA)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='colorca-input'>Color</label>
                            <div className="input-group mb-3">
                                <input type="text" required onChange={(event) => { setColorCA(event.target.value); }} value={ColorCA} placeholder='Ingrese Color' className='form-control' id="colorca-input" name={ColorCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setColorCA)}>X</button>
                            </div>
                        </div>
                    </div>


                    <div className="row g-3 needs-validation">
                        <div className="col-md-3">
                            <label htmlFor='patenteca-input'>Patente Rampa</label>
                            <div className="input-group ">

                                <input type="text" required onChange={(event) => { setPatenteCA(event.target.value); }} value={PatenteCA} placeholder='Ingrese Patente' className='form-control' id="patenteca-input" name={PatenteCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatenteCA)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='marcaca-input'>Marca</label>
                            <div className="input-group ">
                                <input type="text" required onChange={(event) => { setMarcaCA(event.target.value); }} value={MarcaCA} placeholder='Ingrese Marca' className='form-control' id="marcaca-input" name={MarcaCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setMarcaCA)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='empresaca-input'>Empresa</label>
                            <div className="input-group ">
                                <input type="text" required onChange={(event) => { setEmpresaCA(event.target.value); }} value={EmpresaCA} placeholder='Ingrese Empresa' className='form-control' id="empresaca-input" name={EmpresaCA} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setEmpresaCA)}>X</button>
                            </div>
                        </div>




                    </div>
                </div>
            </div>



            <div className="div-btn-container">
                <button className='btn btn-success' type='submit'>Agregar Camion</button>

            </div>
        </form>
    )
}
export default AgregarCA;