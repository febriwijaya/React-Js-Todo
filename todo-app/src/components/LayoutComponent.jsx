import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBarComponent from "./SideBarComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { logout } from "../services/AuthService";

const LayoutComponent = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogout() {
    logout;
    navigate("/login");
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <SideBarComponent
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onLogout={handleLogout}
      />

      <div className="flex-grow-1 d-flex flex-column">
        <HeaderComponent onLogout={handleLogout} />

        <main className="flex-grow-1 p-4 bg-light">
          <div className="card shadow-sm border-0">
            <div className="card-body main-content">
              <Outlet />
            </div>
          </div>
        </main>

        <FooterComponent />
      </div>
    </div>
  );
};

export default LayoutComponent;
