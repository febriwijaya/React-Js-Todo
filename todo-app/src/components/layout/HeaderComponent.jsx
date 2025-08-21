import React from "react";
import { getCurrentUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HeaderComponent = ({ onLogout }) => {
  const username = getCurrentUser();
  const navigate = useNavigate();

  // 🔹 Handler untuk detail user
  const handleDetailUser = async (username) => {
    try {
      if (!username) {
        Swal.fire("Oops!", "Username tidak ditemukan", "error");
        return;
      }
      navigate(`/detail-profile/${username}`);
    } catch (error) {
      console.error("Error navigating to detail profile:", error);
      Swal.fire("Error!", "Gagal membuka halaman profile", "error");
    }
  };

  // 🔹 Handler untuk logout dengan konfirmasi
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        onLogout();
        Swal.fire("Sukses!", "Anda telah logout.", "success");
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire("Error!", "Gagal logout, coba lagi.", "error");
      }
    }
  };

  const changePassword = () => {
    navigate("/change-password");
  };

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
                  onClick={() => handleDetailUser(username)}
                >
                  <i className="bi bi-person me-2"></i> Detail Profile
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changePassword()}
                >
                  <i className="bi bi-key me-2"></i> Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
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
