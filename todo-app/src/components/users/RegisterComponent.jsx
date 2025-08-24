import React, { useState } from "react";
import { registerAPICall } from "../../services/AuthService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({}); // state untuk error message

  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!name) newErrors.name = "Nama wajib diisi";
    if (!username) newErrors.username = "Username wajib diisi";
    if (!email) newErrors.email = "Email wajib diisi";
    if (!password) newErrors.password = "Password wajib diisi";
    if (!birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi";
    if (!jobTitle) newErrors.jobTitle = "Pekerjaan wajib diisi";
    if (!location) newErrors.location = "Lokasi wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleRegistrationForm(e) {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Form Tidak Lengkap",
        text: "Mohon isi semua field yang wajib.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const userData = {
      name,
      username,
      email,
      password,
      birthDate,
      jobTitle,
      location,
    };

    registerAPICall(userData, photo)
      .then(() => {
        Swal.fire({
          title: "Register Berhasil!",
          text: "Silahkan login untuk melanjutkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Register Gagal!",
          text:
            error.response?.data?.message || "Terjadi kesalahan saat register.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      });
  }

  // helper class untuk input error
  const getInputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;

  return (
    <div className="justify-content-center align-items-center bg-light vh-100">
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration Form</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleRegistrationForm}>
                {/* Name */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Full Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className={getInputClass("name")}
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className={getInputClass("username")}
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>
                  <div className="col-md-9">
                    <input
                      type="email"
                      className={getInputClass("email")}
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      className={getInputClass("password")}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                {/* Birth Date */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Birth Date</label>
                  <div className="col-md-9">
                    <input
                      type="date"
                      className={getInputClass("birthDate")}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                    {errors.birthDate && (
                      <div className="invalid-feedback">{errors.birthDate}</div>
                    )}
                  </div>
                </div>

                {/* Job Title */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Job Title</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className={getInputClass("jobTitle")}
                      placeholder="Enter Job Title"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    {errors.jobTitle && (
                      <div className="invalid-feedback">{errors.jobTitle}</div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Location</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className={getInputClass("location")}
                      placeholder="Enter Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>
                </div>

                {/* Upload Photo */}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Photo</label>
                  <div className="col-md-9">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>

                <div className="text-center mt-3">
                  <span>Do you already have an account? Please </span>
                  <a
                    href="/login"
                    className="text-success text-decoration-none"
                  >
                    Log in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
