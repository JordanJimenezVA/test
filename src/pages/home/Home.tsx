import "./home.scss";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartbox/ChartBox";
import { chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data";
import { useQuery } from "@tanstack/react-query";

const host_server = import.meta.env.VITE_SERVER_HOST;

const fetchChartData = async () => {
  const response = await fetch(`${host_server}/ChartBox`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dataArray = data[0]; // Accedemos al primer array de datos

  const rolesExternos = [
    'Especialista Trade',
    'Peoneta',
    'Gestor Trade',
    'Mantencion Cctv',
    'Mantencion Gruas',
    'Mantencion Jardines',
    'Mantencion General',
    'Mantencion Bresler',
    'Tecnico Fumigación',
    'Otrosex'
  ];
  const rolesInternos = [
    'Administrativo Existencias',
    'Administrativo de Distribución',
    'Administrativo Congelados',
    'Jefe de Sucursal',
    'Jefe Comercial',
    'Jefe de Distribución',
    'Coordinador Trade Marketing',
    'Supervisor de Distribución',
    'Supevisor Ventas',
    'Cajero',
    'Secretaria',
    'Movilizador',
    'Gruero',
    'Despachador',
    'Recepcionista'
  ];
  const rolesCamiones = ['CAMION'];

  const cantidadExterno = dataArray.filter((item: any) => rolesExternos.includes(item.ROL)).length;
  const cantidadInterno = dataArray.filter((item: any) => rolesInternos.includes(item.ROL)).length;
  const cantidadCamion = dataArray.filter((item: any) => rolesCamiones.includes(item.ROL)).length;

  const total = cantidadInterno + cantidadExterno + cantidadCamion;

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} cantidad={total} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} cantidad={cantidadInterno} />
      </div>
      <div className="box box4">
        <ChartBox {...chartBoxRevenue} cantidad={cantidadExterno} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} cantidad={cantidadCamion} />
      </div>
    </div>
  );
}

export default Home;

