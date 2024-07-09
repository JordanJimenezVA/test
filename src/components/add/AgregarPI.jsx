
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
            RolPI: RolPI
        }).then((response) => {
            limpiarcamposPI();
            Swal.fire({
                title: 'Ingreso Exitoso!',
                icon: 'success',
                text: 'Personal Interno ingresado con Exito',
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

    const limpiarcamposPI = () => {
        setRutPI("");
        setNombrePI("");
        setApellidoPI("");
        setVehiculoPI("");
        setColorPI("");
        setRolPI("");
        setPatentePI("");

    }

    const limpiarCampo = (setState) => {
        setState("");
    };


    const handlePatenteChange = (event) => {
        const value = event.target.value.toUpperCase();
        setPatenteCA(value);
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


                            <label htmlFor="rutpi-input">Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutPI}
                                    placeholder='Ingrese Rut'
                                    id="rutpi-input"
                                    name={RutPI}
                                    required
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutPI)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="nombrepi-input">Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" onChange={(event) => { setNombrePI(event.target.value); }} value={NombrePI} required placeholder='Ingrese Nombre' id="nombrepi-input" name={NombrePI} ></input>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombrePI)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="apellidopi-input">Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setApellidoPI(event.target.value); }} value={ApellidoPI} placeholder='Ingrese Apellido' required className='form-control' id="apellidopi-input" name={ApellidoPI} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setApellidoPI)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="rolpi-input">Rol</label>
                            <div className="input-group mb-3">
                                <select onChange={(event) => { setRolPI(event.target.value); }} required value={RolPI} className='form-select ' id="rolpi-input" name={RolPI}>
                                    <option value="">Seleccionar una opción</option>
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
                            <label htmlFor="vepi-input">Vehiculo</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setVehiculoPI(event.target.value); }} value={VehiculoPI} placeholder='Ingrese Vehiculo' className='form-control' id="vepi-input" name={VehiculoPI} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setVehiculoPI)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="patentepi-input">Patente</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={handlePatenteChange} value={PatentePI} placeholder='Ingrese Patente' className='form-control' id="patentepi-input" name={PatentePI} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPatentePI)}>X</button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="colorpi-input">Color</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setColorPI(event.target.value); }} value={ColorPI} placeholder='Ingrese Color' className='form-control' id="colorpi-input" name={ColorPI} />
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