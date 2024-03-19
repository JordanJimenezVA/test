import Home from "./pages/home/Home"
import "./styles/global.scss";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import PersonalInterno from "./pages/personalinterno/PersonalInterno";
import PersonalExterno from "./pages/personalexterno/PersonalExterno";
import Camiones from "./pages/camiones/Camiones";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";

import FormularioPersonalInterno from "./pages/formd/FormularioPersonalInterno";
import FormularioPersonalExterno from "./pages/formd/FormularioPersonalExterno";
import FormularioCamiones from "./pages/formd/FormularioCamiones";

import FormularioSalida from "./pages/formsalida/FormularioSalida";

import Logs from "./pages/logs/Logs";


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import TablaIngreso from "./pages/tablaingreso/TablaIngreso";



const queryClient = new QueryClient();

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
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
        <Footer />

      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/Personal Interno",
          element:<PersonalInterno/>
        },
        {
          path:"/Personal Externo",
          element:<PersonalExterno/>
        },
        {
          path:"/Camiones",
          element:<Camiones />
        },
        {
          path:"/FormularioPersonalInterno",
          element:<FormularioPersonalInterno />
        },
        {
          path:"/FormularioPersonalExterno",
          element:<FormularioPersonalExterno />
        },
        {
          path:"/FormularioCamiones",
          element:<FormularioCamiones />
        },
        {
          path:"/TablaIngreso",
          element:<TablaIngreso />
        },
        {
          path:"/Logs",
          element:<Logs />
        },
        {
          path:"/FormularioSalida/:IDR",
          element:<FormularioSalida />
        }
      ],
    },
    {
      path:"/Login",
      element:<Login/>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
