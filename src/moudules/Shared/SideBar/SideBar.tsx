import { NavLink, useNavigate } from "react-router-dom";
import {
  CategoriesIcon,
  ChangePasswordIcon,
  FavIcon,
  HomeIcon,
  LogOutIcon,
  RecipiesIcon,
  UsersIcon,
} from "../../../assets/svgIcons";
import logo from "../../../assets/images/sidebarlogo.png";
import { useAuth } from "../../../Context/AuthContext";
import { useMemo } from "react";
import type { User } from "../../../interfaces";

interface SideBarProps {
  isOpenDes: boolean;
  isMobileOpen: boolean;
  toggleSide: () => void;
  isMobileView: boolean;
  LoginData:User|null
}

export default function SideBar({
  isOpenDes,
  isMobileOpen,
  toggleSide,
  isMobileView,
  LoginData
}: SideBarProps) {
  const navigate=useNavigate()
  const{setLoginData}=useAuth()
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginData(null)
    navigate("/login");
   
  }
  const Links = useMemo(() => [
    { to: "/dashboard", label: "Home", icon: <HomeIcon />, end: true },
    ...(LoginData?.userGroup === "SuperAdmin" ? [
      { to: "/dashboard/users", label: "Users", icon: <UsersIcon /> },
      { to: "/dashboard/category", label: "Category", icon: <CategoriesIcon />, end: false }
    ] : []),
    ...(LoginData?.userGroup === "SystemUser" ? [
    { to: "/dashboard/favourites", label: "Favorites", icon: <FavIcon />, end: false },

    ] : []),
    { to: "/change_pass", label: "Change Password", icon: <ChangePasswordIcon />, end: false },
   { to: "/dashboard/recipes", label: "Recipes", icon: <RecipiesIcon />, end: false },

  ], [LoginData?.userGroup]);

const sidebarWidth = (isMobileView || isOpenDes) ? "256px" : "80px";

  return (
    <aside
      className="d-flex flex-column shadow-lg position-fixed top-0 start-0"
      style={{
        width: sidebarWidth,
        backgroundColor: "#1F263E",
        height: "100vh",
        transition: "all 0.5s ease",
        zIndex: 1100,
        borderTopRightRadius:"100px",
        transform:isMobileView
          ? (isMobileOpen ? "translateX(0)" : "translateX(-100%)") 
          : "translateX(0)",
      }}
    >
      {/* Logo Section */}
      <div
        className="d-flex align-items-center justify-content-center p-4"
        style={{ cursor: "pointer", minHeight: "100px" }}
        onClick={toggleSide}
      >
        <img 
          src={logo} 
          alt="sideBarLogo" 
          style={{ 
            width: isOpenDes ||isMobileOpen? "150px" : "100px", 
            transition: "width 0.3s ease" 
          }} 
        />
      </div>

      {/* Navigation Links */}
      <nav className="d-flex flex-column flex-grow-1 p-2 gap-2   ">
        {Links.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            end={link.end}
            className={({ isActive }) =>
              `d-flex align-items-center gap-3 py-3 px-3   mx-1 rounded-3 text-decoration-none text-white  ${
                isActive ? "bg-primary fw-bold " : ""
              }`
            }
            style={{transition:"all 1s"}}
            // onClick={() => {
            //   if (isMobileView) toggleSide();
            // }}
          >
            <div style={{ minWidth: "24px" }} className="d-flex justify-content-center">
              {link.icon}
            </div>
            
            {(isOpenDes ||isMobileView) && (
              <span className="text-nowrap" style={{ fontSize: "0.95rem" }}>
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="d-flex align-items-center gap-3 py-3 px-3 mx-1 rounded-2 border-0 bg-transparent text-white opacity-75 transition-all"
          style={{ cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ minWidth: "24px" }} className="d-flex justify-content-center">
            <LogOutIcon />
          </div>
          {(isOpenDes || isMobileView) && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}