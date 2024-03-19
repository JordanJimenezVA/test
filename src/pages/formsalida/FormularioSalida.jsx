import './formularioSalida.scss'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Axios from "axios";
import { useParams } from 'react-router-dom';

function FormularioSalida() {
  const { IDR } = useParams();

  const [formValues, setFormValues] = useState({
    PERSONAL: '',
    APELLIDO: '',
    RUT: '',
    PATENTE: '',
    ROL: '',
    OBSERVACIONES: '',
    GUIADESPACHO: '',
  });

  useEffect(() => {
    getRegistros(IDR);
  }, [IDR]);

  const getRegistros = (IDR) => {
    Axios.get(`http://localhost:8800/FormularioSalida/${IDR}`)
      .then((res) => {
        const { PERSONAL, APELLIDO, RUT, PATENTE, ROL, OBSERVACIONES, GUIADESPACHO } = res.data[0];
        setFormValues({
          PERSONAL,
          APELLIDO,
          RUT,
          PATENTE,
          ROL,
          OBSERVACIONES,
          GUIADESPACHO
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
    });
  };

  const salidaCA = () => {
    Axios.post(`http://localhost:8800/FormularioSalida/${IDR}`, {
      ...formValues
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
    <div className="contenedor">
      <h1 className='h1formd'>Formulario Salida</h1>
      <div className="formulario">
        <div className="campo">
          <label>PERSONAL</label>
          <input type="text" name="PERSONAL" value={formValues.PERSONAL} onChange={handleChange} placeholder="Ingrese Nombre" className="form-control" />
          <label>APELLIDO</label>
          <input type="text" name="APELLIDO" value={formValues.APELLIDO} onChange={handleChange} placeholder='Ingrese Apellido' className='form-control' />
          <label>RUT</label>
          <input type="text" name="RUT" value={formValues.RUT} onChange={handleChange} placeholder='Ingrese Rut' className='form-control' />
          <label>PATENTE</label>
          <input type="text" name="PATENTE" value={formValues.PATENTE} onChange={handleChange} placeholder='Ingrese Patente' className='form-control' />
          <label>ROL</label>
          <input type="text" name="ROL" value={formValues.ROL} onChange={handleChange} placeholder='Ingrese Rol' className='form-control' />
          <label>OBSERVACIONES</label>
          <input type="text" name="OBSERVACIONES" value={formValues.OBSERVACIONES} onChange={handleChange} placeholder='Ingrese Observaciones' className='form-control' />
          <label>GUIA DESPACHO/FACTURA</label>
          <input type="text" name="GUIADESPACHO" value={formValues.GUIADESPACHO} onChange={handleChange} placeholder='Ingrese Guia Despacho/Factura' className='form-control' />
        </div>
        <button className='btn btn-success' onClick={salidaCA}>Marcar Salida</button>
      </div>
    </div>
  );
}

export default FormularioSalida;
