
import { Link } from "react-router-dom";
import { menu } from "../../data";
import { useAuth } from "../../hooks/Auth";
import "./menu.scss"

export const Menu = () => {
  const { userType } = useAuth();

  const getMenuItems = () => {
    return menu.map((item) => {

      if (!item.role || item.role.includes(userType || "")) {
        return (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <img src={listItem.icon} alt="" />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ))}
          </div>
        );
      }
      return null;
    });
  };

  return <div className="menu">{getMenuItems()}</div>;
};

export default Menu;
