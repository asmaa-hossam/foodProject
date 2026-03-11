import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"

interface TableHeaderProps {
 title:string,
  description:string,
  buttonText:string,
  to?:string,
  onClick?:()=>void
}
export default function TableHeader({title,description,buttonText,to,onClick}:TableHeaderProps) {
    const navigate=useNavigate()
    const handleClick=()=>{
        if(onClick) onClick()
            else if(to) {
            navigate(to)
        }
    }
    const {LoginData}=useAuth()
  return (
    <>
       <div className="d-flex flex-column flex-md-row  justify-content-between gap-3 align-items-center ">
        <div className="title">
       <h3 style={{}}>{title}</h3>
       <p className='text-muted'>{description}</p>
        </div>
        {LoginData?.userGroup === "SuperAdmin"&& <div className="btt">
       <button onClick={handleClick} className='btn px-4 py-3 text-light  rounded-4' style={{backgroundColor:"rgba(0, 146, 71, 1)",fontSize:"16px",fontWeight:"700"}}>{buttonText}</button>
        </div>}
       
      </div>
    </>
  )
}
