import { Link } from "react-router-dom";
import "./chartBox.scss";

type Props = {
  color: string;
  icon: string;
  title: string;
  cantidad: number; // Añadimos cantidad como prop
};

const ChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="title">
        <img src={props.icon} alt="" />
        <span>{props.title}</span>
      </div>
      <span className="cantidad">{props.cantidad}</span> {/* Mostramos la cantidad */}
      <Link to="/TablaIngreso" style={{ color: "#fga1" }}>
        Ver todos
      </Link>
    </div>
  );
};

export default ChartBox;
// import { Link } from "react-router-dom"
// import "./chartBox.scss"

// type Props ={
//     color:string;
//     icon:string;
//     title:string;
// }
// const ChartBox = (props : Props) => {
//     return (
//         <div className="chartBox">
//             <div className="title">
//                 <img src={props.icon} alt="" />
//                 <span>{props.title}</span>
//             </div>
//             <span className="cantidad">2</span>
//             <Link to="/TablaIngreso" style={{color:"#fga1"}}>Ver todos</Link>
//         </div>
//     )
// }

// export default ChartBox