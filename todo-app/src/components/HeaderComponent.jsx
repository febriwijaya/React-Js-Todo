import React from "react";
import { getCurrentUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ onLogout }) => {
  const username = getCurrentUser();

  const navigate = useNavigate();

  function detailUser(username) {
    // console.log(username);
    navigate(`/detail-profile/${username}`);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <span className="navbar-brand fw-bold">Dashboard</span>
      <div className="ms-auto">
        {username && (
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle fs-4 me-2"></i>
              <span className="fw-semibold">{username}</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end shadow"
              aria-labelledby="profileDropdown"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => detailUser(username)}
                >
                  <i className="bi bi-person me-2"></i> Detail Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                  <i className="bi bi-key me-2"></i> Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={onLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderComponent;
