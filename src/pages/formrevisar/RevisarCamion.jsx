import './revisarcamion.scss'
import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useChileanTime from '../../hooks/UseChileanTime';
import useCamionTime from '../../hooks/CamionTime';
import { useAuth } from '../../hooks/Auth';
const host_server = import.meta.env.VITE_SERVER_HOST;


function RevisarCamion() {
    const { IDR } = useParams();
    const [rutValido, setRutValido] = React.useState(true);
    const [formValues, setFormValues] = useState({
        PERSONAL: '',
        APELLIDO: '',
        RUT: '',
        PATENTE: '',
        ROL: '',
        OBSERVACIONES: '',
        GUIADESPACHO: '',
        SELLO: '',
        ANDEN: '',
        KILOS: '',
        PALLETS: '',
        SUPERVISOR: '',
        JEFET: '',
        FOTOS: [],
        FECHAINICIO: '',
        FECHAFIN: ''
    });
    const { nombreUsuario } = useAuth();
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [estado, setEstado] = useState("inicio");
    const [formDisabled, setFormDisabled] = useState(true);
    const [confirmDisabled, setConfirmDisabled] = useState(true);
    const [GuardarProgresoDisabled, setGuardarProgresoDisabled] = useState(true);
    const [isFirstOpen, setIsFirstOpen] = useState(true);
    const chileanTime = useChileanTime();
    const camionTime = useCamionTime();

    useEffect(() => {
        if (isFirstOpen) {
            getRegistros(IDR);
            setIsFirstOpen(false); 
            getProgresoRevision(IDR);
        }
    }, [IDR, isFirstOpen]);

    const handleFechaInicio = async () => {
        const horaInicio = await useCamionTime(); 
        setFechaInicio(horaInicio);

        setFormValues(prevValues => ({
            ...prevValues,
            FECHAINICIO: horaInicio,
        }));
        setEstado('fin');
        setFormDisabled(false);
        setGuardarProgresoDisabled(false);
        setConfirmDisabled(true); 
    };

    const handleFechaFin = async () => {
        const horaFin = await useCamionTime(); 
        setFechaFin(horaFin);
        setFormValues(prevValues => ({
            ...prevValues,
            FECHAFIN: horaFin,
        }));
 
        setConfirmDisabled(false); 
    };

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
        setRutValido(validarRut(newValue)); 
    }

    const getProgresoRevision = (IDR) => {
        Axios.get(`${host_server}/ProgresoRevision/${IDR}`)
            .then((res) => {
                if (res.data.length > 0) {
                    const progreso = res.data[0];
                    setFormValues({
                        PERSONAL: progreso.PERSONAL,
                        APELLIDO: progreso.APELLIDO,
                        RUT: progreso.RUT,
                        PATENTE: progreso.PATENTE,
                        ROL: progreso.ROL,
                        OBSERVACIONES: progreso.OBSERVACIONES,
                        GUIADESPACHO: progreso.GUIADESPACHO,
                        SELLO: progreso.SELLO,
                        ANDEN: progreso.ANDEN,
                        KILOS: progreso.KILOS,
                        PALLETS: progreso.PALLETS,
                        SUPERVISOR: progreso.SUPERVISOR,
                        JEFET: progreso.JEFET,
                        FOTOS: Array.isArray(progreso.FOTOS) ? progreso.FOTOS : [],
                        FECHAINICIO: progreso.FECHAINICIO,
                    });
                    setFechaInicio(progreso.FECHAINICIO);
                    setEstado("fin");
                    setFormDisabled(false);
                    setGuardarProgresoDisabled(false);
                } else {
                    setFormDisabled(true);
                    setConfirmDisabled(true);
                    setGuardarProgresoDisabled(true);
                }
            })
            .catch((error) => {
                console.error("Error al obtener progreso de revisión:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al obtener progreso de revisión, intente nuevamente más tarde",
                });
            });
    };


    const getRegistros = (IDR) => {
        Axios.get(`${host_server}/FormularioSalida/${IDR}`)
            .then((res) => {
                const { PERSONAL, APELLIDO, RUT, PATENTE, ROL, OBSERVACIONES, GUIADESPACHO, SELLO } = res.data[0];
                setFormValues({
                    PERSONAL,
                    APELLIDO,
                    RUT,
                    PATENTE,
                    ROL,
                    OBSERVACIONES,
                    GUIADESPACHO,
                    SELLO,
                    FOTOS: []
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


    const handleFileChange = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const allowedTypes = ["image/jpeg", "image/png"];
        const newPhotos = Array.from(files).filter(file => allowedTypes.includes(file.type));

        setFormValues(prevState => ({
            ...prevState,
            FOTOS: [...prevState.FOTOS, ...newPhotos]
        }));
    };


    const limpiarCampos = () => {
        setFormValues({
            PERSONAL: '',
            APELLIDO: '',
            RUT: '',
            PATENTE: '',
            ROL: '',
            OBSERVACIONES: '',
            GUIADESPACHO: '',
            SELLO: '',
            ANDEN: '',
            KILOS: '',
            PALLETS: '',
            SUPERVISOR: '',
            JEFET: '',
            FOTOS: []
        });
        setFechaInicio(null);
        setFechaFin(null);
        setEstado("inicio");
        setFormDisabled(true);
        setConfirmDisabled(true);
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };


    const revisionCA = () => {
        const formData = new FormData();
        Object.keys(formValues).forEach(key => {
            if (key === 'FOTOS') {
                if (Array.isArray(formValues[key])) {
                    formValues[key].forEach(photo => {
                        formData.append('FOTOS', photo);
                    });
                }
            } else {
                formData.append(key, formValues[key]);
            }
        });
        formData.append('fechaInicio', fechaInicio);
        formData.append('fechaFin', fechaFin);
        formData.append('NombreUsuario', nombreUsuario)

        Axios.post(`${host_server}/RevisionCamion/${IDR}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            Swal.fire({
                title: 'Revision Exitosa!',
                icon: 'success',
                text: 'Revision Realizada Correctamente',
                timer: 1500
            });
        }).catch((error) => {
            console.error("Error al confirmar la revisión:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al confirmar la revisión, intente nuevamente más tarde",
            });
        });
    }

    const guardarProgreso = () => {
        const formData = new FormData();
        Object.keys(formValues).forEach(key => {
            if (key === 'FOTOS') {
                if (Array.isArray(formValues[key])) {
                    formValues[key].forEach(photo => {
                        formData.append('FOTOS', photo); 
                    });
                }
            } else {
                formData.append(key, formValues[key]);
            }
        });
        formData.append('fechaInicio', fechaInicio);

        Axios.post(`${host_server}/GuardarProgreso/${IDR}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            Swal.fire({
                title: 'Progreso Guardado!',
                icon: 'success',
                text: 'El progreso ha sido guardado correctamente',
                timer: 1500
            });
        }).catch((error) => {
            console.error("Error al guardar el progreso:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al guardar el progreso, intente nuevamente más tarde",
            });
        });
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            revisionCA();
        }}>
            <h1 className='h1formd'>Revision Camion</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Camion<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">

                        <div className="col-auto">


                            <label htmlFor='rutr-input'>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={formValues.RUT}
                                    placeholder='Ingrese Rut'
                                    disabled={formDisabled}
                                    id='rutr-input'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUT')} disabled={formDisabled}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='nombrer-input'>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PERSONAL" value={formValues.PERSONAL} onChange={handleChange} placeholder="Ingrese Nombre" disabled={formDisabled} id='nombrer-input' className="form-control" ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PERSONAL')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='apellidor-input'>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" name="APELLIDO" value={formValues.APELLIDO} onChange={handleChange} placeholder='Ingrese Apellido' disabled={formDisabled} id='apellidor-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('APELLIDO')} disabled={formDisabled}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='rolr-input'>Rol</label>
                            <div className="input-group mb-3">
                                <input type="text" name="ROL" value={formValues.ROL} onChange={handleChange} placeholder='Ingrese Rol' disabled={formDisabled} id='rolr-input' className='form-control'></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('ROL')} disabled={formDisabled} >X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor='planillar-input'>Planilla de Transporte</label>
                            <div className="input-group mb-3">
                                <input type="text" name="GUIADESPACHO" value={formValues.GUIADESPACHO} onChange={handleChange} placeholder='Ingrese Planilla de Transporte' id='planillar-input' disabled={formDisabled} className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('GUIADESPACHO')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='sellor-input'>Sello Cortado</label>
                            <div className="input-group mb-3">
                                <input type="text" name="SELLO" value={formValues.SELLO} onChange={handleChange} placeholder='Ingrese Sello' disabled={formDisabled} id='sellor-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('SELLO')} disabled={formDisabled} >X</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Revision<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">
                        <div className="col-md-3">
                            <label htmlFor='obsr-input'>Observaciones</label>
                            <div className="input-group mb-3">
                                <input type="text" name="OBSERVACIONES" value={formValues.OBSERVACIONES} onChange={handleChange} placeholder='Ingrese Observaciones' disabled={formDisabled} id='obsr-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('OBSERVACIONES')} disabled={formDisabled} >X</button>
                            </div>
                        </div>


                        <div className="col-md-3">
                            <label htmlFor='anden-input'>N° Anden</label>
                            <div className="input-group mb-3">
                                <input type="text" name="ANDEN" value={formValues.ANDEN} onChange={handleChange} placeholder='Ingrese N°Anden' disabled={formDisabled} id='anden-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('ANDEN')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='kilos-input'>Total Kilos</label>
                            <div className="input-group mb-3">
                                <input type="text" name="KILOS" value={formValues.KILOS} onChange={handleChange} placeholder='Ingrese Total Kilos' disabled={formDisabled} id='kilos-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('KILOS')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='pallets-input'>Cantidad Pallets</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PALLETS" value={formValues.PALLETS} onChange={handleChange} placeholder='Ingrese Cantidad Pallets' disabled={formDisabled} id='pallets-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PALLETS')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='superv-input'>Supervisor</label>
                            <div className="input-group mb-3">
                                <input type="text" name="SUPERVISOR" value={formValues.SUPERVISOR} onChange={handleChange} placeholder='Ingrese Supervisor' disabled={formDisabled} id='superv-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('SUPERVISOR')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='jefer-input'>Jefe de turno CD</label>
                            <div className="input-group mb-3">
                                <input type="text" name="JEFET" value={formValues.JEFET} onChange={handleChange} placeholder='Ingrese Jefe de turno CD' disabled={formDisabled} id='jefer-input' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('JEFET')} disabled={formDisabled} >X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor='fotosr-input'>Fotos</label>
                            <div>
                                <input type="file" name="FOTOS" onChange={handleFileChange} disabled={formDisabled} id='fotosr-input' multiple accept=".jpg, .jpeg, .png" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <div className="buttons-left">
                    <button type="button" onClick={handleFechaInicio} className="btn btn-warning me-2">Dar Inicio</button>
                    <button type='button' className='btn btn-primary me-2' disabled={GuardarProgresoDisabled} onClick={guardarProgreso}>Guardar Progreso</button>
                    /</div>
                <div className="buttons-right">
                    <button type="button" onClick={handleFechaFin} className="btn btn-warning me-2">Dar Fin</button>
                    <button className='btn btn-success' disabled={confirmDisabled} type='submit'>Confirmar Revision</button>
                </div>


            </div>
        </form>

    );
}

export default RevisarCamion;
