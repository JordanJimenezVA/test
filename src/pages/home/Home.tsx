import "./home.scss";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartbox/ChartBox";
import { chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data";
import { useEffect, useState } from "react";

const Home = () => {
  const [, setChartData] = useState<any[]>([]); // Estado para almacenar los datos de la tabla
  const [chartDataEx, setChartDataEx] = useState<number>(0); // Estado para almacenar la cantidad total de personal externo
  const [chartDataCa, setChartDataCa] = useState<number>(0); // Estado para almacenar la cantidad total de personal externo
  const host_server = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host_server}/ChartBox`);
      const dataArray = await response.json();
      const data = dataArray[0]; // Accedemos al primer array de datos

      const rolesExternos = ['Jardines', 'Fumigación', 'Camiones', 'Reciclaje', 'Otros'];
      const rolesInternos = ['Administrativo', 'Bodega'];
      const rolesCamiones = ['CAMION'];

      const cantidadExterno = data.filter((item: any) => rolesExternos.includes(item.ROL)).length;
      const cantidadInterno = data.filter((item: any) => rolesInternos.includes(item.ROL)).length;
      const cantidadCamion = data.filter((item: any) => rolesCamiones.includes(item.ROL)).length;

      setChartData([{cantidad: cantidadInterno }]);
      setChartDataEx(cantidadExterno);
      setChartDataCa(cantidadCamion);

    };

    fetchData();
  }, []);
  const total = chartDataCa + chartDataEx + chartDataCa;
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} cantidad={total} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} cantidad={chartDataEx} />
      </div>
      <div className="box box4">
        <ChartBox {...chartBoxRevenue} cantidad={chartDataCa} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} cantidad={chartDataEx} />
      </div>
    </div>
  );
 }
export default Home;
