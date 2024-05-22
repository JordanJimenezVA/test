import './verinforme.scss'
import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';



const host_server = import.meta.env.VITE_SERVER_HOST;

function VerInforme() {
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
        ER: '',
        JEFET: '',
        FOTOS: [],
    });

    useEffect(() => {
        getRegistros(IDR);
    }, [IDR]);

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

    const getRegistros = (IDR) => {
        Axios.get(`${host_server}/VerInforme/${IDR}`)
            .then((res) => {
                const { PERSONAL, APELLIDO, RUT, PATENTE, ROL, OBSERVACIONES, GUIADESPACHO, SELLO, ANDEN, KILOS, PALLETS, SUPERVISOR, ER, JEFET, FOTOS } = res.data[0];
                // Verificar si FOTOS es un array antes de mapearlo

                const fotosArray = FOTOS.split(', ').map(filename => `${host_server}/imagenes/${filename}`);
                setFormValues({
                    PERSONAL,
                    APELLIDO,
                    RUT,
                    PATENTE,
                    ROL,
                    OBSERVACIONES,
                    GUIADESPACHO,
                    SELLO,
                    ANDEN,
                    KILOS,
                    PALLETS,
                    SUPERVISOR,
                    ER,
                    JEFET,
                    FOTOS: fotosArray,
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
    const showImageModal = (foto) => {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = foto;
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); // Evita que se recargue la página
        }}>
            <h1 className='h1formd'>Informe Camion</h1>
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
                            <label>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                                    value={formValues.RUT}
                                    placeholder='Ingrese Rut'
                                    disabled="true"
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PERSONAL" value={formValues.PERSONAL} onChange={handleChange} disabled="true" placeholder="Ingrese Nombre" className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Apellido</label>
                            <div className="input-group mb-3">
                                <input type="text" name="APELLIDO" value={formValues.APELLIDO} onChange={handleChange} disabled="true" placeholder='Ingrese Apellido' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Rol</label>
                            <div className="input-group mb-3">
                                <input type="text" name="ROL" value={formValues.ROL} onChange={handleChange} disabled="true" placeholder='Ingrese Rol' className='form-control'></input>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Planilla de Transporte</label>
                            <div className="input-group mb-3">
                                <input type="text" name="GUIADESPACHO" value={formValues.GUIADESPACHO} disabled="true" onChange={handleChange} placeholder='Ingrese Planilla de Transporte' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Sello Cortado</label>
                            <div className="input-group mb-3">
                                <input type="text" name="SELLO" value={formValues.SELLO} disabled="true" onChange={handleChange} placeholder='Ingrese Sello' className='form-control' />
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
                            <label>Observaciones</label>
                            <div className="input-group mb-3">
                                <input type="text" name="OBSERVACIONES" value={formValues.OBSERVACIONES} disabled="true" onChange={handleChange} placeholder='Ingrese Observaciones' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>N° Anden</label>
                            <div className="input-group mb-3">
                                <input type="text" name="ANDEN" value={formValues.ANDEN} disabled="true" onChange={handleChange} placeholder='Ingrese N°Anden' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Total Kilos</label>
                            <div className="input-group mb-3">
                                <input type="text" name="KILOS" value={formValues.KILOS} disabled="true" onChange={handleChange} placeholder='Ingrese Total Kilos' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Cantidad Pallets</label>
                            <div className="input-group mb-3">
                                <input type="text" name="PALLETS" value={formValues.PALLETS} disabled="true" onChange={handleChange} placeholder='Ingrese Cantidad Pallets' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Supervisor Interno</label>
                            <div className="input-group mb-3">
                                <input type="text" name="SUPERVISOR" value={formValues.SUPERVISOR} disabled="true" onChange={handleChange} placeholder='Ingrese Supervisor Interno' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Encargado de la Revision</label>
                            <div className="input-group mb-3">
                                <input type="text" name="ER" value={formValues.ER} disabled="true" onChange={handleChange} placeholder='Ingrese Encargado de la Revision' className='form-control' />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Jefe de turno CD</label>
                            <div className="input-group mb-3">
                                <input type="text" name="JEFET" value={formValues.JEFET} disabled="true" onChange={handleChange} placeholder='Ingrese Jefe de Turno CD' className='form-control' />
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

                <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    navigation
                    className="mySwiper"
                >
                    {formValues.FOTOS && formValues.FOTOS.length > 0 ? (
                        formValues.FOTOS.map((foto, index) => (
                            <SwiperSlide key={index}>
                                <img src={foto} className="img-thumbnail" alt={`Foto ${index + 1}`} style={{ maxWidth: '100px', cursor: 'pointer' }} onClick={() => showImageModal(foto)} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <p>No hay fotos disponibles</p>
                        </SwiperSlide>
                    )}
                </Swiper>

                <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="imageModalLabel">Imagen</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img id="modalImage" src="" className="img-fluid" alt="Imagen grande" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}

export default VerInforme;
