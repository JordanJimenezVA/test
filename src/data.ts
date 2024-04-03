export const menu = [
  {
    id: 1,
    title: "Principal",
    listItems: [
      {
        id: 1,
        title: "Monitoreo",
        url: "/",
        icon: "home.svg",
      }
    ],
  },
  {
    id: 2,
    title: "Gestión",
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
    title: "Ver Personas/Camiones",
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

export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Elva McDonald",
    type: "Camion",
    action: "Salida",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Linnie Nelson",
    type: "Personal Exterior",
    action: "Entrada",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    type: "Personal Interior",
    action: "Entrada",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Watson",
    type: "Camion",
    action: "Entrada",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Juan Harrington",
    type: "Camion",
    action: "Salida",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Augusta McGee",
    type: "Personal Interior",
    action: "Entrada",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Angel Thomas",
    type: "Camion",
    action: "Salida",
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

