import React, { useState } from 'react'
import "./login.scss"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [values, setValues] = useState({
    rut: '',
    password: '',
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8800/Login', { rutU: values.rut, passwordU: values.password })
    .then(res => {
      if(res.data.Status === "Success"){
        navigate('/')
      }else{
        alert(res.data.Message)
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="login-page">
      <div className="formlogin">
        <form onSubmit={handleSubmit} className="login-form">
          <input onChange={e => setValues({ ...values, rut: e.target.value })} type="text" name="rut" placeholder="RUT" />
          <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" name="password" placeholder="Contraseña" />
          <button>login</button>
        </form>
      </div>
    </div>
  )
}
