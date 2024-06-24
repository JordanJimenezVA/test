import { Link } from "react-router-dom";
import "./chartBox.scss";

type Props = {
  color: string;
  icon: string;
  title: string;
  cantidad: number; 
};

const ChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="title">
        <img src={props.icon} alt="" />
        <span>{props.title}</span>
      </div>
      <span className="cantidad">{props.cantidad}</span>
      <Link to="/TablaIngreso" style={{ color: "#fga1" }}>
        Ver todos
      </Link>
    </div>
  );
};

export default ChartBox;
