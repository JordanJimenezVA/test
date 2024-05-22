import "./navbar.scss"
import "../../styles/responsive.scss";
import Axios from "axios";
const host_server = import.meta.env.VITE_SERVER_HOST;

function menuToggle() {
  const toggleMenu = document.querySelector(".menu");
  if (toggleMenu) {
    toggleMenu.classList.toggle("active");
  }
}

const handleDelete = () => {
  Axios.get(`${host_server}/Logout`)
    .then(() => {
      window.location.href = '/';
    })
    .catch(err => console.log(err));
};

export const Navbar = ({ nombreUsuario }: { nombreUsuario: string }) => {

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>SISTEMA ANDES</span>
      </div>
      <div className="icons">
        <div className="user">
          <span>{nombreUsuario}</span>
        </div>
        <div className="action">
          <div className="profile" onClick={menuToggle}>
            <img src="/settings.svg" alt="" className="icon" />
          </div>
          <div className="menu">
            <ul>
              <li>
                <a onClick={handleDelete}>Cerrar Sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Navbar