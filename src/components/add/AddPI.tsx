import { GridColDef } from "@mui/x-data-grid";
import "./addPI.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const host_server = import.meta.env.VITE_SERVER_HOST;


type Props = {
    slug: string,
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddPI = (props: Props) => {


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return fetch(`${host_server}/Personal%20Interno`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allusers'] })
    },
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    await mutation.mutateAsync(data);
    props.setOpen(false);
  }

    return (
        <div className="addPI">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Marcar Ingreso {props.slug} </h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter(item => item.field !== "idPI")
                        .map(column => (
                            <div className="item">
                                <label>{column.headerName}</label>
                                {column.field === "rolPI" ? (
                                    <select>
                                        <option value="opcion1">Administrativos</option>
                                        <option value="opcion2">Bodega</option>
                                    </select>
                                ) : (
                                    <input type={column.type} placeholder={column.headerName} />
                                )}
                            </div>
                        ))}
                    <button>Marcar Ingreso</button>
                </form>
            </div>
        </div>
    )
}

export default AddPI;