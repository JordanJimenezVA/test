
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

  
function AgregarPI() {
    const [RutPI, setRutPI] = useState("");
    const [NombrePI, setNombrePI] = useState("");
    const [ApellidoPI, setApellidoPI] = useState("");
    const [VehiculoPI, setVehiculoPI] = useState("");
    const [ColorPI, setColorPI] = useState("");
    const [PatentePI, setPatentePI] = useState("");
    const [RolPI, setRolPI] = useState("");
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

    const ingresoformdPI = () => {
        if (!validarRut(RutPI)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "RUT inválido. Por favor, ingrese un RUT válido.",
            });
            return;
        }
        Axios.post(`${host_server}/AgregarPersonalInterno`, {
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
            <h1 className='h1formd'>Ingresar Personal Interno</h1>
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

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutPI}
                                    placeholder='Ingrese Rut'
                                    id={RutPI}
                                    name={RutPI}
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
                <button className='btn btn-success' type='submit'>Agregar</button>


            </div>
        </form>
    )
}
export default AgregarPI;