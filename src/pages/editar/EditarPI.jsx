import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const host_server = import.meta.env.VITE_SERVER_HOST;




function EditarPI() {
    const { IDPI } = useParams();
    const [rutValido, setRutValido] = React.useState(true);

    const [formValues, setFormValues] = useState({
        RUTPI: '',
        NOMBREPI: '',
        APELLIDOPI: '',
        ROLPI: '',
        ESTADOPI: '',
        VEHICULOPI: '',
        PATENTEPI: '',
        COLORPI: '',
    });

    useEffect(() => {
        getPersonalInterno(IDPI);
    }, [IDPI]);

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

    const getPersonalInterno = (IDPI) => {
        Axios.get(`${host_server}/EditarPersonalInterno/${IDPI}`)
            .then((res) => {
                const { RUTPI, NOMBREPI, APELLIDOPI, ROLPI, ESTADOPI, VEHICULOPI, PATENTEPI, COLORPI } = res.data[0];
                setFormValues({
                    RUTPI,
                    NOMBREPI,
                    APELLIDOPI,
                    ROLPI,
                    ESTADOPI,
                    VEHICULOPI,
                    PATENTEPI,
                    COLORPI,
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
            RUTPI: '',
            NOMBREPI: '',
            APELLIDOPI: '',
            ROLPI: '',
            ESTADOPI: '',
            VEHICULOPI: '',
            PATENTEPI: '',
            COLORPI: '',
        });
    };

    const limpiarCampo = (campo) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [campo]: '',
        }));
    };

    const editarPI = () => {
        Axios.put(`${host_server}/EditarPersonalInterno/${IDPI}`, {
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
            editarPI();
        }}>
            <h1 className='h1formd'>Modificar Personal Interno</h1>
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
                                    value={formValues.RUTPI}
                                    placeholder='Ingrese Rut'
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUTPI')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="NOMBREPI" value={formValues.NOMBREPI} onChange={handleChange} placeholder="Ingrese Nombre" className="form-control" ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('NOMBREPI')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" name="APELLIDOPI" value={formValues.APELLIDOPI} onChange={handleChange} placeholder='Ingrese Apellido' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('APELLIDOPI')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Rol</label>
                            <div className="input-group mb-3">
                                <select name="ROLPI" value={formValues.ROLPI} onChange={handleChange} className='form-select '>
                                    <option value="Administrativo Existencias">Administrativo Existencias</option>
                                    <option value="Administrativo de Distribución">Administrativo de Distribución</option>
                                    <option value="Administrativo Congelados">Administrativo Congelados</option>
                                    <option value="Jefe de Sucursal">Jefe de Sucursal</option>
                                    <option value="Jefe Comercial">Jefe Comercial</option>
                                    <option value="Jefe de Distribución">Jefe de Distribución</option>
                                    <option value="Coordinador Trade Marketing">Coordinador Trade Marketing</option>
                                    <option value="Supervisor de Distribución">Supervisor de Distribución</option>
                                    <option value="Supevisor Ventas">Supevisor Ventas</option>
                                    <option value="Cajero">Cajero</option>
                                    <option value="Secretaria">Secretaria</option>
                                    <option value="Movilizador">Movilizador</option>
                                    <option value="Gruero">Gruero</option>
                                    <option value="Despachador">Despachador</option>
                                    <option value="Recepcionista">Recepcionista</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Estado</label>
                            <div className="input-group mb-3">
                                <select name="ESTADOPI" value={formValues.ESTADOPI} onChange={handleChange} className='form-select '>
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
                                <input type="text" name="VEHICULOPI" value={formValues.VEHICULOPI} onChange={handleChange} placeholder='Ingrese Vehiculo' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('VEHICULOPI')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Patente</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PATENTEPI" value={formValues.PATENTEPI} onChange={handleChange} placeholder='Ingrese Patente' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PATENTEPI')}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Color</label>
                            <div className="input-group mb-3">
                                <input type="text" name="COLORPI" value={formValues.COLORPI} onChange={handleChange} placeholder='Ingrese Color' className='form-control' />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('COLORPI')}>X</button>
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

export default EditarPI;
