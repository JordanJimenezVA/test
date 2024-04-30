
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

function AgregarPE() {
    const [RutPE, setRutPE] = useState("");
    const [NombrePE, setNombrePE] = useState("");
    const [ApellidoPE, setApellidoPE] = useState("");
    const [VehiculoPE, setVehiculoPE] = useState("");
    const [ColorPE, setColorPE] = useState("");
    const [PatentePE, setPatentePE] = useState("");
    const [RolPE, setRolPE] = useState("");
    const [EmpresaPE, setEmpresaPE] = useState("");
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
        setRutPE(newValue);
        setRutValido(validarRut(newValue)); // Validar el RUT al cambiar
    }

    const ingresoformdPE = () => {
        if (!validarRut(RutPE)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "RUT inválido. Por favor, ingrese un RUT válido.",
            });
            return;
        }
        Axios.post(`${host_server}/AgregarPersonalExterno`, {
            rutPE: RutPE,
            NombrePE: NombrePE,
            ApellidoPE: ApellidoPE,
            VehiculoPE: VehiculoPE,
            ColorPE: ColorPE,
            PatentePE: PatentePE,
            RolPE: RolPE,
            EmpresaPE: EmpresaPE
        }).then(() => {

            limpiarCamposPE();
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


    const limpiarCamposPE = () => {
        setRutPE("");
        setNombrePE("");
        setApellidoPE("");
        setVehiculoPE("");
        setColorPE("");
        setPatentePE("");
        setRolPE("");
        setEmpresaPE("");
    }

    const limpiarCampo = (setState) => {
        setState("");
    };




    return (

        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
            ingresoformdPE();
        }}>
            <h1 className='h1formd'>Ingresar Personal Externo</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Personal Externo<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">

                        <div className="col-auto">


                            <label>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutPE}
                                    placeholder='Ingrese Rut'
                                    id={RutPE}
                                    name={RutPE}
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutPE)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" onChange={(event) => { setNombrePE(event.target.value); }} value={NombrePE} placeholder='Ingrese Nombre' id={NombrePE} name={NombrePE} ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombrePE)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setApellidoPE(event.target.value); }} value={ApellidoPE} placeholder='Ingrese Apellido' className='form-control' id={ApellidoPE} name={ApellidoPE} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoPE)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Rol</label>
                            <div className="input-group mb-3">
                                <select onChange={(event) => { setRolPE(event.target.value); }} value={RolPE} className='form-select ' id={RolPE} name={RolPE}>
                                    <option value=""></option>
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
                            <label>Empresa</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setEmpresaPE(event.target.value); }} value={EmpresaPE} placeholder='Ingrese Empresa' className='form-control' id={EmpresaPE} name={EmpresaPE} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setEmpresaPE)}>X</button>
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
                                <input type="text" onChange={(event) => { setVehiculoPE(event.target.value); }} value={VehiculoPE} placeholder='Ingrese Vehiculo' className='form-control' id={VehiculoPE} name={VehiculoPE} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setVehiculoPE)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Patente</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setPatentePE(event.target.value); }} value={PatentePE} placeholder='Ingrese Patente' className='form-control' id={PatentePE} name={PatentePE} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatentePE)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Color</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setColorPE(event.target.value); }} value={ColorPE} placeholder='Ingrese Color' className='form-control' id={ColorPE} name={ColorPE} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setColorPE)}>X</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="div-btn-container">
                <button className='btn btn-success' type='submit'>Agregar</button>


            </div>
        </form>
    )
}
export default AgregarPE;