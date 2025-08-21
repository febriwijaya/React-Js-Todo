import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getCurrentUser } from "../../services/AuthService";
import Swal from "sweetalert2";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Old password wajib diisi.";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password wajib diisi.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New password minimal 6 karakter.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password wajib diisi.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const changePasswordProfile = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop kalau validasi gagal
    }

    const username = getCurrentUser();
    const passwordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      await changePassword(username, passwordData);
      Swal.fire("Berhasil!", "Password berhasil diperbarui.", "success");
      navigate(`/detail-profile/${username}`);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan server.";
      Swal.fire("Gagal!", errorMessage, "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center py-3">Change Password</h3>
          <div className="card-body">
            <form onSubmit={changePasswordProfile}>
              {/* Old Password */}
              <div className="form-group mb-2">
                <label className="form-label">Old password :</label>
                <input
                  type="password"
                  name="oldPassword"
                  className={`form-control ${
                    errors.oldPassword ? "is-invalid" : ""
                  }`}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {errors.oldPassword && (
                  <small className="text-danger">{errors.oldPassword}</small>
                )}
              </div>

              {/* New Password */}
              <div className="form-group mb-2">
                <label className="form-label">New password :</label>
                <input
                  type="password"
                  name="newPassword"
                  className={`form-control ${
                    errors.newPassword ? "is-invalid" : ""
                  }`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {errors.newPassword && (
                  <small className="text-danger">{errors.newPassword}</small>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group mb-2">
                <label className="form-label">Confirm password :</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              <button type="submit" className="btn btn-success w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
