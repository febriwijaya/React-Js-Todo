import React from "react";
import { NavLink } from "react-router-dom";
import {
  isUserLoggedIn,
  isAdminUser,
  logout,
} from "../../services/AuthService";

const SideBarComponent = ({ isCollapsed, toggleCollapse, onLogout }) => {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();

  return (
    <div
      className={`bg-dark text-white d-flex flex-column p-3 shadow ${
        isCollapsed ? "collapsed-sidebar" : ""
      }`}
      style={{
        width: isCollapsed ? "70px" : "250px",
        transition: "all 0.3s ease",
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!isCollapsed && <h5 className="mb-0 fw-bold">Todo App</h5>}
        <button
          className="btn btn-sm btn-outline-light"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <i className="bi bi-chevron-double-right"></i>
          ) : (
            <i className="bi bi-chevron-double-left"></i>
          )}
        </button>
      </div>

      <ul className="nav flex-column">
        {isAuth && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/todos"
                className="nav-link text-white d-flex align-items-center"
              >
                <i className="bi bi-list-task me-2"></i>
                {!isCollapsed && "Todos"}
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item mb-2">
                <NavLink
                  to="/users"
                  className="nav-link text-white d-flex align-items-center"
                >
                  <i className="bi bi-people me-2"></i>
                  {!isCollapsed && "Users"}
                </NavLink>
              </li>
            )}
          </>
        )}

        {!isAuth && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/login"
                className="nav-link text-white d-flex align-items-center"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                {!isCollapsed && "Login"}
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/register"
                className="nav-link text-white d-flex align-items-center"
              >
                <i className="bi bi-person-plus me-2"></i>
                {!isCollapsed && "Register"}
              </NavLink>
            </li>
          </>
        )}

        {isAuth && (
          <li className="nav-item mt-4">
            <button
              onClick={onLogout}
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-box-arrow-left me-2"></i>
              {!isCollapsed && "Logout"}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBarComponent;
