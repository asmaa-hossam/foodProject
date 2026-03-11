import { Outlet } from "react-router-dom";
import authimg from "../../../assets/images/authimg.webp"
export default function AuthLayout() {
  return (
    <>
    <div className="authContainer " style={{backgroundImage:`url(${authimg})`,backgroundSize:"cover",height:"100vh",backgroundPosition:"center",position:"relative"}}>
      <div className="container-fluid overLay " style={{position:"absolute",background:"linear-gradient(45deg, rgba(55,140,47,0.6), rgba(0,0,0,0.7))",height:"100vh"}} >
        <div className="row vh-100  justify-content-center align-items-center">
          <div className="col col-md-6 col-lg-5">
            <div className="form bg-white rounded-3 p-3">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
