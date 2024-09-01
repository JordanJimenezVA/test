import { useState, useEffect } from 'react';
import Axios from 'axios';

const host_server = import.meta.env.VITE_SERVER_HOST;

const GuardiaID = (): string | null => {
    const [IDINST, setIDINST] = useState<string | null>(null);

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const response = await Axios.get(`${host_server}/IDINST`, {
                    withCredentials: true, 
                });
                setIDINST(response.data.IDINST);
            } catch (error) {
                console.error('Error al obtener usuario:', error);
                setIDINST(null);
            }
        };

        obtenerDatosUsuario();
    }, []);

    return IDINST;
};

export default GuardiaID;
