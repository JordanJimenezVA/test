import { useEffect, useState } from 'react';
import Axios from 'axios';

interface Usuario {
  nombre: string;
  apellido: string;
}

const useNombreApellidoUsuario = (): Usuario | null => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const response = await Axios.get('/ruta/para/obtener/usuario');
        const { nombre, apellido } = response.data;
        setUsuario({ nombre, apellido });
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        setUsuario(null);
      }
    };

    obtenerDatosUsuario();
  }, []); // Solo se ejecuta una vez al montar el componente

  return usuario;
};

export default useNombreApellidoUsuario;