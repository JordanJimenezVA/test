import Swal from 'sweetalert2';
import './verNovedad.scss'
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
                        <h4 className='guardia-h3'>Guardia</h4>
                        <p>{formValues.GUARDIANO}</p>
                    </div>
                    <div className="accion-observable">
                        <h4 className='fecha-h3'>Fecha</h4>
                        <p>{formValues.HORANO}</p>
                    </div>
                </div>
                <div className="accion-observable">

                </div>
            </div>
        </form>
    );

}

export default VerNovedad;
