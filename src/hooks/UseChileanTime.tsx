import { useState, useEffect } from 'react';

const useChileanTime = () => {
  const [chileanTime, setChileanTime] = useState<string>();

  const fetchChileanTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/America/Santiago');
      const data = await response.json();
      const date = new Date(data.datetime);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
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
