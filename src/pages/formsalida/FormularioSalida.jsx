import './formularioSalida.scss'
import Swal from 'sweetalert2';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useChileanTime from '../../hooks/UseChileanTime';
import { useAuth } from '../../hooks/Auth';
const host_server = import.meta.env.VITE_SERVER_HOST;


function FormularioSalida() {
  const { IDR } = useParams();
  const { nombreUsuario } = useAuth();
  const [rutValido, setRutValido] = React.useState(true);
  const chileanTime = useChileanTime();
  const [formValues, setFormValues] = useState({
    PERSONAL: '',
    APELLIDO: '',
    RUT: '',
    PATENTE: '',
    ROL: '',
    OBSERVACIONES: '',
    GUIADESPACHO: '',
    SELLO: '',
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
          SELLO
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
      PERSONAL: '',
      APELLIDO: '',
      RUT: '',
      PATENTE: '',
      ROL: '',
      OBSERVACIONES: '',
      GUIADESPACHO: '',
      SELLO: '',
    });
  };

  const limpiarCampo = (campo) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [campo]: '',
    }));
  };
  const salidaCA = () => {
    Axios.post(`${host_server}/FormularioSalida/${IDR}`, {
      ...formValues,
      FECHASALIDA: chileanTime,
      NombreUsuario: nombreUsuario
      
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: 'Salida Exitosa!',
        icon: 'success',
        text: 'Salida registrada correctamente',
        timer: 1500
      });
    }).catch((error) => {
      console.error("Error al marcar salida:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al marcar salida, intente nuevamente más tarde",
      });
    });
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault(); // Evita que se recargue la página
      salidaCA();
    }}>
      <h1 className='h1formd'>Marcar Salida</h1>
      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Personal<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">

          <div className="row g-3 needs-validation">

            <div className="col-auto">


              <label htmlFor='ruts-input'>Rut {rutValido ? null : <span style={{ color: "red" }}>RUT inválido</span>}</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => handleRutChange(event, { newValue: event.target.value })}
                  value={formValues.RUT}
                  placeholder='Ingrese Rut'
                  id='ruts-input'
                />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('RUT')}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='nombres-input'>Nombre</label>
              <div className="input-group mb-3">
                <input type="text" name="PERSONAL" value={formValues.PERSONAL} onChange={handleChange} placeholder="Ingrese Nombre" id='nombres-input' className="form-control" ></input>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('PERSONAL')}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='apellidos-input'>Apellido</label>
              <div className="input-group mb-3">
                <input type="text" name="APELLIDO" value={formValues.APELLIDO} onChange={handleChange} id='apellidos-input' placeholder='Ingrese Apellido' className='form-control' />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('APELLIDO')}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='rols-input'>Rol</label>
              <div className="input-group mb-3">
                <input type="text" name="ROL" value={formValues.ROL} onChange={handleChange} id='rols-input' placeholder='Ingrese Rol' className='form-control'></input>
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('ROL')}>X</button>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="card shadow-none border my-4" data-component-card="data-component-card">
        <div className="card-header border-bottom bg-body">
          <div className="row g-3 justify-content-between align-items-center">
            <div className="col-12 col-md">
              <h4 className="text-body mb-0" data-anchor="data-anchor" id="grid-auto-sizing">Datos Extras<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#grid-auto-sizing"></a></h4>
            </div>
          </div>
        </div>

        <div className="card-body ">

          <div className="row g-3 needs-validation">
            <div className="col-md-3">
              <label htmlFor='obss-input'>Observaciones</label>
              <div className="input-group mb-3">
                <input type="text" name="OBSERVACIONES" value={formValues.OBSERVACIONES} id='obss-input' onChange={handleChange} placeholder='Ingrese Observaciones' className='form-control' />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('OBSERVACIONES')}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='planillas-input'>Planilla de Transporte</label>
              <div className="input-group mb-3">
                <input type="text" name="GUIADESPACHO" value={formValues.GUIADESPACHO} id='planillas-input' onChange={handleChange} placeholder='Ingrese Planilla de Transporte' className='form-control' />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('GUIADESPACHO')}>X</button>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor='sellos-input'>Sello</label>
              <div className="input-group mb-3">
                <input type="text" name="SELLO" value={formValues.SELLO} onChange={handleChange} id='sellos-input' placeholder='Ingrese Sello' className='form-control' />
                <button className="btn btn-danger" type="button" id="button-addon1" onClick={() => limpiarCampo('SELLO')}>X</button>
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="div-btn-container">
        <button className='btn btn-success' type='submit'>Confirmar Salida</button>


      </div>
    </form>

  );
}

export default FormularioSalida;
