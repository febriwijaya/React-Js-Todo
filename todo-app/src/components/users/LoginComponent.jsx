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
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Login Form</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleLoginForm}>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">
                    Username / Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username or email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
