import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const host_server = import.meta.env.VITE_SERVER_HOST;




function EditarNG() {
    const { IDNG } = useParams();
    const [rutValido, setRutValido] = React.useState(true);

    const [formValues, setFormValues] = useState({
        RUTNG: '',
        ESTADONG: '',
    });

    useEffect(() => {
        getPersonaReportada(IDNG);
    }, [IDNG]);

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

    const getPersonaReportada = (IDNG) => {
        Axios.get(`${host_server}/EditarPersonasReportadas/${IDNG}`)
            .then((res) => {
                const { RUTNG, ESTADONG } = res.data[0];
                setFormValues({
                    RUTNG,
                    ESTADONG,
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
            RUTNG: '',
            ESTADONG: ''
        });
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };

    const editarNG = () => {
        Axios.put(`${host_server}/EditarPersonasReportadas/${IDNG}`, {
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
            editarNG();
        }}>
            <h1 className='h1formd'>Modificar Datos</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Persona Reportada<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
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
                                    value={formValues.RUTNG}
                                    placeholder='Ingrese Rut'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUTNG')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Estado</label>
                            <div className="input-group mb-3">
                                <select name="ESTADONG" value={formValues.ESTADONG} onChange={handleChange} className='form-select '>
                                    <option value="">Seleccionar una opción</option>
                                    <option value="PERMS1">Permiso con precaución</option>
                                    <option value="PERMS2">Solicitar permiso</option>
                                    <option value="NOACCESO">Prohibido el acceso</option>
                                </select>
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

export default EditarNG;
