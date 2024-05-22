export const menu = [
  {
    id: 1,
    title: "Principal",
    role: ["Administrador", "Guardia", "Supervisor"],
    listItems: [
      {
        id: 1,
        title: "Monitoreo",
        url: "/Home",
        icon: "home.svg",
      }
    ],
  },
  {
    id: 2,
    title: "Gestión",
    role: ["Administrador", "Supervisor"],
    listItems: [
      {
        id: 1,
        title: "Personal Externo",
        url: "/Personal Externo",
        icon: "user.svg",
      },
      {
        id: 2,
        title: "Personal Interno",
        url: "/Personal Interno",
        icon: "user1.svg",
      },
      {
        id: 3,
        title: "Camiones",
        url: "/Camiones",
        icon: "truck2.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Marcar Entrada",
    role: ["Administrador", "Guardia"],
    listItems: [
      {
        id: 1,
        title: "Personal Externo",
        url: "/FormularioPersonalExterno",
        icon: "form3.svg",
      },
      {
        id: 2,
        title: "Personal Interno",
        url: "/FormularioPersonalInterno",
        icon: "form3.svg",
      },
      {
        id: 3,
        title: "Camiones",
        url: "/FormularioCamiones",
        icon: "form3.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Revision",
    role: ["Administrador", "Supervisor"],
    listItems: [
      {
        id: 1,
        title: "Revisión Camiones",
        url: "/Revision",
        icon: "form3.svg",
      },
      {
        id: 1,
        title: "Informe Camiones",
        url: "/InformeCamion",
        icon: "form3.svg",
      }
    ],
  },
  {
    id: 5,
    title: "Ver Personas/Camiones",
    role: ["Administrador", "Guardia"],
    listItems: [
      {
        id: 1,
        title: "Lista de Ingreso",
        url: "/TablaIngreso",
        icon: "list3.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/Logs",
        icon: "log.svg",
      }
    ],
  },
];


export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total en Recinto",
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Personal Interno",
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "Personal Externo",
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Camiones",
};

