import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Header from "../Shared/Header/Header";

export default function DashBoard() {
   const {LoginData}=useAuth()
   const navigate =useNavigate()
  return (
    <>
      <Header text1="Welcome " text2={LoginData?.userName||"user"} paragraph={`This is a welcoming screen for the entry of the application  you can now see the options`}/>
       <div className="d-flex  justify-content-between gap-5 align-items-center ">
        <div className="title">
       <h3>Fill the <span className=' text-success'>Recipeis.......</span></h3>
       <p className='text-muted'>you can now fill the meals easily using the table and form <br/> click here and sill it with the table !</p>
        </div>
        <div className="btt">
       <button onClick={()=>navigate('/dashboard/recipes')} className='btn px-5 py-2 text-light  rounded-2' style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>Fill Recipes<i className="fas fa-arrow-right m-2"></i></button>
        </div>
      </div>
     
    </>
  )
}
