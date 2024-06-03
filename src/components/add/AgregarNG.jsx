
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

  
function AgregarPI() {
    const [RutNG, setRutNG] = useState("");
    const [EstadoNG, setEstadoNG] = useState("");
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
        setRutNG(newValue);
        setRutValido(validarRut(newValue)); // Validar el RUT al cambiar
    }

    const ingresoformdNG = () => {
        if (!validarRut(RutNG)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "RUT inválido. Por favor, ingrese un RUT válido.",
            });
            return;
        }
        Axios.post(`${host_server}/AgregarPersonaNG`, {
            RutNG: RutNG,
            EstadoNG: EstadoNG
        }).then((response) => {
            limpiarcamposNG();
            Swal.fire({
                title: 'Ingreso Exitoso!',
                icon: 'success',
                text: 'Personal Reportado ingresado con Exito',
                timer: 1500
            })
        }).catch((error) => {
            console.error('Error:', error); // Agrega este log para ver el error en detalle
            const errorMessage = error.response && error.response.data && error.response.data.message 
                ? error.response.data.message 
                : 'Error desconocido';
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        });
    }

    const limpiarcamposNG = () => {
        setRutNG("");
        setEstadoNG("");

    }

    const limpiarCampo = (setState) => {
        setState("");
    };




    return (

        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
            ingresoformdNG();
        }}>
            <h1 className='h1formd'>Reportar Persona</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Persona<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">

                        <div className="col-auto">


                            <label htmlFor="rutpi-input">Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutNG}
                                    placeholder='Ingrese Rut'
                                    id="rutpi-input"
                                    name={RutNG}
                                    required
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutNG)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="rolpi-input">Estado</label>
                            <div className="input-group mb-3">
                                <select onChange={(event) => { setEstadoNG(event.target.value); }} required value={EstadoNG} className='form-select ' id="rolpi-input" name={EstadoNG}>
                                    <option value="">Seleccionar una opción</option>
                                    <option value="PERMS1">Permiso con precaución</option>
                                    <option value="PERMS2">Solicitar permiso</option>
                                    <option value="NOACCESO">Prohibido el acceso</option>
                                </select>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setEstadoNG)}>X</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


            <div className="div-btn-container">
                <button className='btn btn-success' type='submit'>Reportar</button>


            </div>
        </form>
    )
}
export default AgregarPI;