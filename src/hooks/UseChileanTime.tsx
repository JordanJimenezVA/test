import { useState, useEffect } from 'react';

const useChileanTime = () => {
  const [chileanTime, setChileanTime] = useState<string>();

  const fetchChileanTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/America/Santiago');
      const data = await response.json();
      const date = new Date(data.datetime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`; // Formato sin segundos
      setChileanTime(formattedDate);
    } catch (error) {
      console.error('Error fetching Chilean time:', error);
    }
  };

  useEffect(() => {
    fetchChileanTime();
  }, []);

  return chileanTime; // Devolver directamente la cadena de fecha formateada sin segundos
};

export default useChileanTime;
