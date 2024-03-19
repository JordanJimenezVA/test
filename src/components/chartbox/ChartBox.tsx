import { Link } from "react-router-dom"
import "./chartBox.scss"

type Props ={
    color:string;
    icon:string;
    title:string;
}
const ChartBox = (props : Props) => {
    return (
        <div className="chartBox">
            <div className="title">
                <img src={props.icon} alt="" />
                <span>{props.title}</span>
            </div>
            <span className="cantidad">11</span>
            <Link to="/" style={{color:"#fga1"}}>Ver todos</Link>
        </div>
    )
}

export default ChartBox