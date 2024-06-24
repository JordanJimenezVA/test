import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const host_server = import.meta.env.VITE_SERVER_HOST;




function EditarPE() {
    const { IDCA } = useParams();
    const [rutValido, setRutValido] = React.useState(true);

    const [formValues, setFormValues] = useState({
        RUTCA: '',
        CHOFERCA: '',
        APELLIDOCHOFERCA: '',
        PATENTECA: '',
        MARCACA: '',
        TIPOCA: '',
        MODELOCA: '',
        COLORCA: '',
        EMPRESACA: '',
        ESTADOCA: '',
    });

    useEffect(() => {
        getCamiones(IDCA);
    }, [IDCA]);

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

    const getCamiones = (IDCA) => {
        Axios.get(`${host_server}/EditarCamiones/${IDCA}`)
            .then((res) => {
                const { RUTCA, CHOFERCA, APELLIDOCHOFERCA, PATENTECA, MARCACA, TIPOCA, MODELOCA, COLORCA, EMPRESACA, ESTADOCA } = res.data[0];
                setFormValues({
                    RUTCA,
                    CHOFERCA,
                    APELLIDOCHOFERCA,
                    PATENTECA,
                    MARCACA,
                    TIPOCA,
                    MODELOCA,
                    COLORCA,
                    EMPRESACA,
                    ESTADOCA,
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
            RUTCA: '',
            CHOFERCA: '',
            APELLIDOCHOFERCA: '',
            PATENTECA: '',
            MARCACA: '',
            TIPOCA: '',
            MODELOCA: '',
            COLORCA: '',
            EMPRESACA: '',
            ESTADOCA: '',
        });
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };

    const editarCA = () => {
        Axios.put(`${host_server}/EditarCamiones/${IDCA}`, {
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
            editarCA();
        }}>
            <h1 className='h1formd'>Modificar Camion</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Chofer<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
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
                                    value={formValues.RUTCA}
                                    placeholder='Ingrese Rut'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUTCA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="CHOFERCA" value={formValues.CHOFERCA} onChange={handleChange} placeholder="Ingrese Nombre" className="form-control" ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('CHOFERCA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" name="APELLIDOCHOFERCA" value={formValues.APELLIDOCHOFERCA} onChange={handleChange} placeholder='Ingrese Apellido' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('APELLIDOCHOFERCA')}>X</button>
                            </div>
                        </div>




                        <div className="col-md-3">
                            <label>Estado</label>
                            <div className="input-group mb-3">
                                <select name="ESTADOPE" value={formValues.ESTADOPE} onChange={handleChange} className='form-select '>
                                    <option value="VIGENTE">VIGENTE</option>
                                    <option value="NOVIGENTE">NO VIGENTE</option>
                                    <option value="NOAPTO">NO APTO</option>
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
                            <label>Tipo</label>
                            <div className="input-group mb-3">
                                <select name="TIPOCA" value={formValues.TIPOCA} onChange={handleChange} className='form-select '>
                                    <option value="SEMIREMOLQUE">SEMIREMOLQUE</option>
                                    <option value="CAMION">PEONETA</option>
                                    <option value="TRACTOCAMION">TRACTOCAMION</option>
                                    <option value="CHASIS CABINADO">CHASIS CABINADO</option>
                                    <option value="REMOLQUE">REMOLQUE</option>
                                    <option value="CHASIS CABINADO">CHASIS CABINADO</option>
                                    <option value="OtrosCA">Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Modelo</label>
                            <div className="input-group mb-3">
                                <input type="text" name="MODELOCA" value={formValues.MODELOCA} onChange={handleChange} placeholder='Ingrese Modelo' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('MODELOCA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Color</label>
                            <div className="input-group mb-3">
                                <input type="text" name="COLORCA" value={formValues.COLORCA} onChange={handleChange} placeholder='Ingrese Color' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('COLORCA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Patente Rampa</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PATENTECA" value={formValues.PATENTECA} onChange={handleChange} placeholder='Ingrese Patente' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PATENTECA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Marca</label>
                            <div className="input-group mb-3">
                                <input type="text" name="MARCACA" value={formValues.MARCACA} onChange={handleChange} placeholder='Ingrese Marca' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('MARCACA')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Empresa</label>
                            <div className="input-group mb-3">
                                <input type="text" name="EMPRESACA" value={formValues.EMPRESACA} onChange={handleChange} placeholder='Ingrese Empresa' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('EMPRESACA')}>X</button>
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
