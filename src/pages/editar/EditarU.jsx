import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const host_server = import.meta.env.VITE_SERVER_HOST;




function EditarU() {
    const { IDU } = useParams();
    const [rutValido, setRutValido] = React.useState(true);

    const [formValues, setFormValues] = useState({
        RUTU: '',
        NOMBREU: '',
        TIPOU: '',
        PASSWORDU: '',
    });

    useEffect(() => {
        getUsuarios(IDU);
    }, [IDU]);

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
        setRutU(newValue);
        setRutValido(validarRut(newValue)); // Validar el RUT al cambiar
    }

    const getUsuarios = (IDU) => {
        Axios.get(`${host_server}/EditarUsuarios/${IDU}`)
            .then((res) => {
                const { RUTU, NOMBREU, TIPOU, PASSWORDU } = res.data[0];
                setFormValues({
                    RUTU,
                    NOMBREU,
                    TIPOU,
                    PASSWORDU,
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
            RUTU: '',
            NOMBREU: '',
            TIPOU: '',
            PASSWORDU: '',
        });
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };

    const editarU = () => {
        Axios.put(`${host_server}/EditarU/${IDU}`, {
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
            editarU();
        }}>
            <h1 className='h1formd'>Modificar Datos</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Usuario<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
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
                                    value={formValues.RUTU}
                                    placeholder='Ingrese Rut'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUTU')}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="NOMBREU" value={formValues.NOMBREU} onChange={handleChange} placeholder="Ingrese Nombre" className="form-control" ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('NOMBREU')}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="rolpi-input">Tipo Usuario</label>
                            <div className="input-group mb-3">
                                <select name='TIPOU' onChange={handleChange} required value={formValues.TIPOU} className='form-select ' id="tipou-input" >
                                    <option value="">Seleccionar una opción</option>
                                    <option value="Guardia">Guardia</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('TIPOU')}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="apellidopi-input">Password</label>
                            <div className="input-group mb-3">
                                <input type="text" name='PASSWORDU' onChange={handleChange} value={formValues.PASSWORDU} placeholder='Ingrese Password' required className='form-control' id="passwordu-input" />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PASSWORDU')}>X</button>
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

export default EditarU;
