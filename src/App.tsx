import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./pages/home/Home"
import "./styles/global.scss";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import PersonalInterno from "./pages/personalinterno/PersonalInterno";
import PersonalExterno from "./pages/personalexterno/PersonalExterno";
import Camiones from "./pages/camiones/Camiones";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";

// @ts-ignore
import AgregarPI from "./components/add/AgregarPI";

// @ts-ignore
import AgregarPE from "./components/add/AgregarPE";
// @ts-ignore
import AgregarCA from "./components/add/AgregarCA";


import { AuthProvider } from './hooks/Auth';


// @ts-ignore
import FormularioPersonalInterno from "./pages/formd/FormularioPersonalInterno";
// @ts-ignore
import FormularioPersonalExterno from "./pages/formd/FormularioPersonalExterno";
// @ts-ignore
import FormularioCamiones from "./pages/formd/FormularioCamiones";
// @ts-ignore
import FormularioSalida from "./pages/formsalida/FormularioSalida";


// @ts-ignore
import EditarPI from "./pages/editar/EditarPI";
// @ts-ignore
import EditarPE from "./pages/editar/EditarPE";
// @ts-ignore
import EditarCA from "./pages/editar/EditarCA";



import TablaIngreso from "./pages/tablaingreso/TablaIngreso";

import Historial from "./pages/historial/Historial";

import { useAuth } from './hooks/Auth';

import Revision from './pages/revision/Revision';

// @ts-ignore
import RevisarCamion from './pages/formrevisar/RevisarCamion';

import InformeCamion from './pages/informes/Informecamion';

// @ts-ignore
import VerInforme from './pages/viewinforme/VerInforme';

const queryClient = new QueryClient();

function App() {

  const Layout = () => {
    const { nombreUsuario } = useAuth();
    return (
      <div className="main">
        <Navbar nombreUsuario={nombreUsuario ? nombreUsuario : ''} />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>

      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProvider><Login /></AuthProvider>,
    },
    {
      path: "/",
      element: <AuthProvider><Layout /></AuthProvider>,
      children: [
        {
          path: "/Home",
          element: <AuthProvider><Home /></AuthProvider>,
        },
        {
          path: "/Personal Interno",
          element: <AuthProvider><PersonalInterno /></AuthProvider>,
        },
        {
          path: "/Personal Externo",
          element: <AuthProvider><PersonalExterno /></AuthProvider>
        },
        {
          path: "/Camiones",
          element: <AuthProvider><Camiones /></AuthProvider>
        },
        {
          path: "/FormularioPersonalInterno",
          element: <AuthProvider><FormularioPersonalInterno /></AuthProvider>
        },
        {
          path: "/FormularioPersonalExterno",
          element: <AuthProvider><FormularioPersonalExterno /></AuthProvider>
        },
        {
          path: "/FormularioCamiones",
          element: <AuthProvider><FormularioCamiones /></AuthProvider>
        },
        {
          path: "/AgregarPersonalInterno",
          element: <AuthProvider><AgregarPI /></AuthProvider>
        },
        {
          path: "/TablaIngreso",
          element: <AuthProvider><TablaIngreso /></AuthProvider>
        },
        {
          path: "/Logs",
          element: <AuthProvider> <Historial /></AuthProvider>
        },
        {
          path: "/FormularioSalida/:IDR",
          element: <FormularioSalida />
        },
        {
          path: "/EditarPersonalInterno/:IDPI",
          element: <AuthProvider><EditarPI /></AuthProvider>
        },
        {
          path: "/EditarPersonalExterno/:IDPE",
          element: <AuthProvider><EditarPE /></AuthProvider>
        },
        {
          path: "/EditarCamiones/:IDCA",
          element: <AuthProvider><EditarCA /></AuthProvider>
        },
        {
          path: "/Revision",
          element: <AuthProvider><Revision /></AuthProvider>
        },
        {
          path: "/RevisionCamion/:IDR",
          element: <AuthProvider><RevisarCamion /></AuthProvider>
        },
        {
          path: "/InformeCamion/",
          element: <AuthProvider><InformeCamion /> </AuthProvider>
        },
        {
          path: "/VerInforme/:IDR",
          element: <AuthProvider><VerInforme /></AuthProvider>
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
