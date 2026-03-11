import { Menue } from "../../../assets/svgIcons";
import { useAuth } from "../../../Context/AuthContext";

interface NavBarprops{
 toggleSidebar:()=>void
}
const NavBar = ({toggleSidebar }:NavBarprops) => {
 const {LoginData} =useAuth()
  return (
    <div className=" bg-light    d-flex  align-items-center justify-content-between  px-4"
    style={{height:"50px"}}
    >
      <button
        onClick={toggleSidebar}
        className=" d-md-none bg-transparent border-0 text-dark" 
      >
      <Menue/>
      </button>
     
      <h3 style={{color:"rgba(31, 56, 76, 1)"}}>{LoginData?.userName}</h3>

    </div>
  );
};

export default NavBar;
