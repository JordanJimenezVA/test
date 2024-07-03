
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
import "./addNO.scss";
import useChileanTime from "../../hooks/UseChileanTime";
import { useAuth } from '../../hooks/Auth';
const host_server = import.meta.env.VITE_SERVER_HOST;


function AgregarNO() {
    const { nombreUsuario } = useAuth();
    const chileanTime = useChileanTime();
    const [NotaNO, setNotaNO] = useState('');
    const [GuardiaNO, setGuardiaNO] = useState("");
    const [HoraNO, setHoraNO] = useState("");


    const ingresoformdNO = () => {
        Axios.post(`${host_server}/AgregarNO`, {
            NotaNO: NotaNO,
            GuardiaNO: nombreUsuario,
            HoraNO: chileanTime
        }).then((response) => {
            limpiarcamposNO();
            Swal.fire({
                title: 'Ingreso Exitoso!',
                icon: 'success',
                text: 'Novedad ingresada con Exito',
                timer: 1500
            })
        }).catch((error) => {
            console.error('Error:', error);
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

    const limpiarcamposNO = () => {
        setNotaNO("");
    }

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            ingresoformdNO();
        }}>
            <h1 className='h1formd'>Reportar Novedad</h1>
            <div className="card shadow-none border my-4" data-component-card="data-component-card">
                <div className="card-header border-bottom bg-body">
                    <div className="row g-3 justify-content-between align-items-center">
                        <div className="col-12 col-md">
                            <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Novedad<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
                        </div>
                    </div>
                </div>

                <div className="card-body ">

                    <div className="row g-3 needs-validation">

                        <div className="col-auto-NO">


                            <label className='descrip-label' htmlFor="descrip-input">Descripcion Novedad </label>
                            <div className="input-group mb-3">

                                <textarea
                                    onChange={(event) => {setNotaNO(event.target.value); }}
                                    type="text"
                                    className="form-control"
                                    placeholder='Ingrese Descripcion'
                                    id="descrip-label"
                                    value={NotaNO}
                                    name={NotaNO}
                                    required
                                    style={{ height: 250 + "px" }}
                                />
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
export default AgregarNO;