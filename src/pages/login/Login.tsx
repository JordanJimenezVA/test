import React, { useState } from 'react'
import "./login.scss"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth'; // Importa el hook useAuth
const host_server = import.meta.env.VITE_SERVER_HOST;


export default function Login() {
  const [values, setValues] = useState({
    rut: '',
    password: '',
  })

  const navigate = useNavigate()
  const { setUserType, setNombreUsuario } = useAuth()!;

  axios.defaults.withCredentials = true;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión aquí (axios.post, etc.)
      const res = await axios.post(`${host_server}/Login`, { rutU: values.rut, passwordU: values.password });
      // Verificar si la respuesta del servidor es exitosa
      if (res.data.Status === 'Success') {
        // Redirigir a la página principal
        const userTypeRes = await axios.get(`${host_server}/UserType`, {
          params: {
            RUTU: values.rut
          }
        });

        const userType = userTypeRes.data.userType;
        const nombreUsuario = userTypeRes.data.nombreUsuario;

        setNombreUsuario(nombreUsuario);
        setUserType(userType);



        setUserType(userType);

        navigate('/Home');
      } else {
        alert('Error al ingresar/Verificar datos');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="formlogin">
        <form onSubmit={handleSubmit} className="login-form">
          <input onChange={e => setValues({ ...values, rut: e.target.value })} type="text" name="rut" placeholder="Usuario" autoComplete='rut' />
          <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" name="password" placeholder="Contraseña" autoComplete='password' />
          <button>login</button>
        </form>
      </div>
    </div>
  )
}
