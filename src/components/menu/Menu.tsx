
// import { Link } from "react-router-dom";
// import { menu } from "../../data";
// import { useAuth } from "../../hooks/Auth";
// import "./menu.scss"

// export const Menu = () => {
//   const { userType } = useAuth();

//   const getMenuItems = () => {
//     return menu.map((item) => {

//       if (!item.role || item.role.includes(userType || "")) {
//         return (
//           <div className="item" key={item.id}>
//             <span className="title">{item.title}</span>
//             {item.listItems.map((listItem) => (
//               <Link to={listItem.url} className="listItem" key={listItem.id}>
//                 <img src={listItem.icon} alt="" />
//                 <span className="listItemTitle">{listItem.title}</span>
//               </Link>
//             ))}
//           </div>
//         );
//       }
//       return null;
//     });
//   };

//   return <div className="menu">{getMenuItems()}</div>;
// };

// export default Menu;
import { useState } from "react";
import { Link } from "react-router-dom";
import { menu } from "../../data";
import { useAuth } from "../../hooks/Auth";
import "./menu.scss";

// Definimos el tipo para el estado openItems
type OpenItems = {
  [key: number]: boolean;
};

export const Menu = () => {
  const { userType } = useAuth();
  const [openItems, setOpenItems] = useState<OpenItems>({});

  const handleToggle = (id: number) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getMenuItems = () => {
    return menu.map((item) => {
      if (!item.role || item.role.includes(userType || "")) {
        const isOpen = openItems[item.id];

        return (
          <div className={`item ${isOpen ? "open" : ""}`} key={item.id}>
            {item.listItems.length === 0 ? (
              <span className="title main">{item.title}</span>
            ) : (
              <>
                <span className="title" onClick={() => handleToggle(item.id)}>
                  {item.title}
                  <span className={`arrow ${isOpen ? "down" : "right"}`}>▶</span>
                </span>
                <div className={`list-menu ${isOpen ? "expanded" : "collapsed"}`}>
                  {item.listItems.map((listItem) => (
                    <Link to={listItem.url} className="listItem" key={listItem.id}>
                      <img src={listItem.icon} alt="" />
                      <span className="listItemTitle">{listItem.title}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      }
      return null;
    });
  };

  return <div className="menu">{getMenuItems()}</div>;
};

export default Menu;

