import Swal from 'sweetalert2';
import './vernovedad.scss'
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const host_server = import.meta.env.VITE_SERVER_HOST;


function VerNovedad() {
    const { IDNO } = useParams();
    const [formValues, setFormValues] = useState({
        NOTANO: '',
        GUARDIANO: '',
        HORANO: ''
    });

    useEffect(() => {
        getNovedad(IDNO);
    }, [IDNO]);


    const getNovedad = (IDNO) => {
        Axios.get(`${host_server}/VerNO/${IDNO}`)
            .then((res) => {
                const { HORANO, GUARDIANO, NOTANO } = res.data[0];
                setFormValues({
                    HORANO,
                    GUARDIANO,
                    NOTANO,
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



    return (
        
        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
        }}>
            <div className="detalle-accion">
                <h2 className='title-h2'>Detalle de la Novedad</h2>
                <hr />
                <div className="descripcion">
                    <h3>Descripción</h3>
                    <p>{formValues.NOTANO}</p>
                </div><br></br>
                <div className="accion-observable-container">
                    <div className="accion-observable">
                        <h3 className='guardia-h3'>Guardia</h3>
                        <p>{formValues.GUARDIANO}</p>
                    </div>
                    <div className="accion-observable">
                        <h3 className='fecha-h3'>Fecha</h3>
                        <p>{formValues.HORANO}</p>
                    </div>
                </div>
                <div className="accion-observable">

                </div>
            </div>
        </form>
    );



    // return (
    //     <form onSubmit={(e) => {
    //         e.preventDefault(); // Evita que se recargue la página
    //     }}>
    //         <h1 className='h1formd'>Ver Novedad</h1>
    //         <div className="card shadow-none border my-4" data-component-card="data-component-card">
    //             <div className="card-header border-bottom bg-body">
    //                 <div className="row g-3 justify-content-between align-items-center">
    //                     <div className="col-12 col-md">
    //                         <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Novedad<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className="card-body ">

    //                 <div className="row g-3 needs-validation">

    //                     <div className="col-auto-NO">


    //                         <label className='descrip-label' htmlFor="descrip-input">Descripcion Novedad </label>
    //                         <div className="input-group mb-3">

    //                             <textarea

    //                                 type="text"
    //                                 className="form-control"
    //                                 placeholder='Ingrese Descripcion'
    //                                 id="descrip-label"
    //                                 disabled
    //                                 value={formValues.NOTANO}
    //                                 required
    //                                 style={{ height: 250 + "px" }}
    //                             />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </form>

    // );

}

export default VerNovedad;
