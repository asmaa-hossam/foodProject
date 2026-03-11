import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
export default function MasterLayout() {
  const [isOpenDes, setIsOpenDes] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
 const {LoginData}=useAuth()
  const toggleSideBar = () => {
    if (isMobileView) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsOpenDes(!isOpenDes);
    }
  }
useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex min-vh-100 position-relative ">
      <SideBar
        isOpenDes={isOpenDes}
        isMobileOpen={isMobileOpen}
        toggleSide={toggleSideBar}
        isMobileView={isMobileView}
        LoginData={LoginData}
      />

      {isMobileOpen &&isMobileView && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-md-none"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.6)", 
            zIndex: 1050, 
            cursor: "pointer" 
          }}
          onClick={toggleSideBar}
        />
      )}

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column "
        style={{marginLeft: isMobileView ? "0" : (isOpenDes ? "276px" : "100px"),
          transition: "margin-left 0.3s ease",
          minWidth: 0 
        }}
      >
        <NavBar toggleSidebar={toggleSideBar} />
    
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}