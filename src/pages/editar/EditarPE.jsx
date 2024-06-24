import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const host_server = import.meta.env.VITE_SERVER_HOST;




function EditarPE() {
    const { IDPE } = useParams();
    const [rutValido, setRutValido] = React.useState(true);

    const [formValues, setFormValues] = useState({
        RUTPE: '',
        NOMBREPE: '',
        APELLIDOPE: '',
        ROLPE: '',
        EMPRESAPE: '',
        ESTADOPE: '',
        VEHICULOPE: '',
        PATENTEPE: '',
        COLORPE: '',
    });

    useEffect(() => {
        getPersonalExterno(IDPE);
    }, [IDPE]);

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

    const getPersonalExterno = (IDPE) => {
        Axios.get(`${host_server}/EditarPersonalExterno/${IDPE}`)
            .then((res) => {
                const { RUTPE, NOMBREPE, APELLIDOPE, VEHICULOPE, COLORPE, PATENTEPE, ROLPE, EMPRESAPE, ESTADOPE } = res.data[0];
                setFormValues({
                    RUTPE,
                    NOMBREPE,
                    APELLIDOPE,
                    VEHICULOPE,
                    COLORPE,
                    PATENTEPE,
                    ROLPE,
                    EMPRESAPE,
                    ESTADOPE,
                });
            })
            .catch((error) => {
                console.error("Error al obtener registros:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al obtener registros, intente nuevamente más tarde",
                });
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const limpiarCampos = () => {
        setFormValues({
            RUTPE: '',
            NOMBREPE: '',
            APELLIDOPE: '',
            ROLPE: '',
            EMPRESAPE: '',
            ESTADOPE: '',
            VEHICULOPE: '',
            PATENTEPE: '',
            COLORPE: '',
        });
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };

    const editarPE = () => {
        Axios.put(`${host_server}/EditarPersonalExterno/${IDPE}`, {
            ...formValues
        }).then(() => {
            limpiarCampos();
            Swal.fire({
                title: 'Modificación Exitosa!',
                icon: 'success',
                text: 'Modificación realizada correctamente',
                timer: 1500
            });
        }).catch((error) => {
            console.error("Error al modificar:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al modificar, intente nuevamente más tarde",
            });
        });
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
            editarPE();
        }}>
            <h1 className='h1formd'>Modificar Personal Externo</h1>
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
                                    value={formValues.RUTPE}
                                    placeholder='Ingrese Rut'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUTPE')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="NOMBREPE" value={formValues.NOMBREPE} onChange={handleChange} placeholder="Ingrese Nombre" className="form-control" ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('NOMBREPE')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" name="APELLIDOPE" value={formValues.APELLIDOPE} onChange={handleChange} placeholder='Ingrese Apellido' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('APELLIDOPE')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Rol</label>
                            <div className="input-group mb-3">
                                <select name="ROLPE" value={formValues.ROLPE} onChange={handleChange} className='form-select '>
                                    <option value="Especialista Trade">Especialista Trade</option>
                                    <option value="Peoneta">Peoneta</option>
                                    <option value="Gestor Trade">Gestor Trade</option>
                                    <option value="Mantencion Cctv">Mantencion Cctv</option>
                                    <option value="Mantencion Gruas">Mantención Gruas</option>
                                    <option value="Mantencion Jardines">Mantención Jardines</option>
                                    <option value="Mantencion General">Mantencion General</option>
                                    <option value="Mantencion Bresler">Mantencion Bresler</option>
                                    <option value="Tecnico Fumigación">Tecnico Fumigación</option>
                                    <option value="OtrosEx">Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>EmpresaPE</label>
                            <div className="input-group mb-3">
                                <input type="text" name="EMPRESAPE" value={formValues.EMPRESAPE} onChange={handleChange} placeholder='Ingrese Empresa' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('EMPRESAPE')}>X</button>
                            </div>
                        </div>


                        <div className="col-md-3">
                            <label>Estado</label>
                            <div className="input-group mb-3">
                                <select name="ESTADOPE" value={formValues.ESTADOPE} onChange={handleChange} className='form-select '>
                                    <option value="VIGENTE">VIGENTE</option>
                                    <option value="NO VIGENTE">NO VIGENTE</option>
                                    <option value="NO APTO">NO APTO</option>
                                </select>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Vehiculo<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">
                        <div className="col-md-3">
                            <label>Vehiculo</label>
                            <div className="input-group mb-3">
                                <input type="text" name="VEHICULOPE" value={formValues.VEHICULOPE} onChange={handleChange} placeholder='Ingrese Vehiculo' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('VEHICULOPE')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Patente</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PATENTEPE" value={formValues.PATENTEPE} onChange={handleChange} placeholder='Ingrese Patente' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PATENTEPE')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Color</label>
                            <div className="input-group mb-3">
                                <input type="text" name="COLORPE" value={formValues.COLORPE} onChange={handleChange} placeholder='Ingrese Color' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('COLORPE')}>X</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="div-btn-container">
                <button className='btn btn-success' type='submit'>Modificar</button>


            </div>
        </form>

    );
}

export default EditarPE;
