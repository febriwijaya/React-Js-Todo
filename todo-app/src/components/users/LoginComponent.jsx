import React, { useState } from "react";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        title: "Form Belum Lengkap",
        text: "Username dan password wajib diisi!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Sedang Login...",
        text: "Harap tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await loginAPICall(username, password);

      const token = "Bearer " + response.data.accessToken;
      const role = response.data.role;

      storeToken(token);
      saveLoggedInUser(username, role);

      Swal.close();
      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang, ${username}`,
        icon: "success",
        confirmButtonText: "Lanjutkan",
      }).then(() => {
        navigate("/todos");
        window.location.reload(false);
      });
    } catch (error) {
      Swal.close();
      console.error(error);

      Swal.fire({
        title: "Login Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat login.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });

      // Kosongkan inputan jika gagal
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        {/* Gambar header */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Header"
          className="card-img-top"
          style={{
            height: "180px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />

        <div className="card-body">
          <h3 className="text-center mb-4">Sign In</h3>

          <form onSubmit={handleLoginForm}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success">
                Sign In
              </button>
            </div>

            <div className="text-center mt-3">
              <span>Not a member? </span>
              <a href="/register" className="text-success text-decoration-none">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
