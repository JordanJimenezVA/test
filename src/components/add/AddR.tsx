import { GridColDef } from "@mui/x-data-grid";
import "./addPI.scss";



type Props = {
    slug: string,
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddR = (props: Props) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        //add new item
        //axios.post(`/api/${slug}s`,{})
    }
    
  return (
    <div className="addPI">
        <div className="modal">
            <span className="close" onClick={()=>props.setOpen(false)}>X</span>
            <h1>Marcar Salida {props.slug} </h1>
            <form onSubmit={handleSubmit}>
                {props.columns
                .filter(item=>item.field !== "idR")
                .map(column=>(
                    <div className="item">
                        <label>{column.headerName}</label>
                        <input type={column.type} placeholder={column.headerName} />
                    </div>
                ))}
                <button>Marcar Ingreso</button>
            </form>
        </div>
    </div>
  )
}

export default AddR;