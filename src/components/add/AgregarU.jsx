
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;


function AgregarU() {
    const [RutU, setRutU] = useState("");
    const [NombreU, setNombreU] = useState("");
    const [TipoU, setTipoU] = useState("");
    const [PasswordU, setPasswordU] = useState("");
    const [rutValido, setRutValido] = React.useState(true);
    const [showPassword, setShowPassword] = useState(false);
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

    const ingresoformdU = () => {
        if (!validarRut(RutU)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "RUT inválido. Por favor, ingrese un RUT válido.",
            });
            return;
        }
        Axios.post(`${host_server}/AgregarU`, {
            RutU: RutU,
            NombreU: NombreU,
            TipoU: TipoU,
            PasswordU: PasswordU,
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

    const limpiarcamposU = () => {
        setRutU("");
        setNombreU("");
        setTipoU("");
        setPasswordU("");

    }

    const limpiarCampo = (setState) => {
        setState("");
    };




    return (

        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
            ingresoformdU();
        }}>
            <h1 className='h1formd'>Ingresar Usuario</h1>
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


                            <label htmlFor="rutpi-input">Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={RutU}
                                    placeholder='Ingrese Rut'
                                    id="rutu-input"
                                    name={RutU}
                                    required
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setRutU)}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="apellidopi-input">Nombre Usuario</label>
                            <div className="input-group mb-3">
                                <input type="text" onChange={(event) => { setNombreU(event.target.value); }} value={NombreU} placeholder='Ingrese Nombre' required className='form-control' id="nombreu-input" name={NombreU} />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setNombreU)}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="rolpi-input">Tipo Usuario</label>
                            <div className="input-group mb-3">
                                <select onChange={(event) => { setTipoU(event.target.value); }} required value={TipoU} className='form-select ' id="tipou-input" name={TipoU}>
                                    <option value="">Seleccionar una opción</option>
                                    <option value="Guardia">Guardia</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setTipoU)}>X</button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="apellidopi-input">Password</label>
                            <div className="input-group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(event) => { setPasswordU(event.target.value); }}
                                    value={PasswordU}
                                    placeholder="Ingrese Password"
                                    required
                                    className="form-control"
                                    id="passwordu-input"
                                    name="password"
                                />
                                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo(setPasswordU)}>X</button>
                         
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="div-btn-container">
                <button className='btn btn-success' type='submit'>Registrar</button>


            </div>
        </form>
    )
}
export default AgregarU;