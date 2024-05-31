import { useState, useEffect } from 'react';

const useChileanTime = () => {
  const [chileanTime, setChileanTime] = useState<string>();

  const fetchChileanTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/America/Santiago');
      const data = await response.json();
      const date = new Date(data.datetime);
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // Formato compatible con MySQL
      setChileanTime(formattedDate);
    } catch (error) {
      console.error('Error fetching Chilean time:', error);
    }
  };

  useEffect(() => {
    fetchChileanTime();
  }, []);

  return { chileanTime };
};

export default useChileanTime;
