import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCurrentUser,
  getUserById,
  updateUser,
} from "../../services/AuthService";
import Swal from "sweetalert2";

const UpdateUserComponent = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const currentUser = getCurrentUser();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    birthDate: "",
    jobTitle: "",
    location: "",
    profilePhoto: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [errors, setErrors] = useState({}); // simpan pesan error

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const from = location.state?.from;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Gagal mengambil data user.", "error");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto") {
      setPhotoFile(files[0]);
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // reset error ketika diisi
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let requiredFields = [
      "name",
      "username",
      "email",
      "birthDate",
      "jobTitle",
      "location",
    ];

    requiredFields.forEach((field) => {
      if (!user[field] || user[field].trim() === "") {
        formErrors[field] = `${field} tidak boleh kosong`;
      }
    });

    return formErrors;
  };

  const editUserProfile = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Swal.fire("Error!", "Silakan isi semua field yang wajib.", "error");
      return;
    }

    try {
      await updateUser(id, user, photoFile);
      Swal.fire("Berhasil!", "User berhasil diperbarui.", "success");

      if (from === "users") {
        navigate("/users");
      } else {
        navigate(`/detail-profile/${currentUser}`);
      }
    } catch (error) {
      console.error(error);

      let errorMessage = "Gagal memperbarui user.";
      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        }
      }

      Swal.fire("Error!", errorMessage, "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center py-3">Edit User</h3>
          <div className="card-body">
            <form onSubmit={editUserProfile}>
              {/* Name */}
              <div className="form-group mb-2">
                <label className="form-label">Name :</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              {/* Username */}
              <div className="form-group mb-2">
                <label className="form-label">Username :</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>

              {/* Email */}
              <div className="form-group mb-2">
                <label className="form-label">Email :</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* Birth Date */}
              <div className="form-group mb-2">
                <label className="form-label">Birth Date :</label>
                <input
                  type="date"
                  name="birthDate"
                  value={user.birthDate}
                  className={`form-control ${
                    errors.birthDate ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.birthDate && (
                  <small className="text-danger">{errors.birthDate}</small>
                )}
              </div>

              {/* Job Title */}
              <div className="form-group mb-2">
                <label className="form-label">Job Title :</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={user.jobTitle}
                  className={`form-control ${
                    errors.jobTitle ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.jobTitle && (
                  <small className="text-danger">{errors.jobTitle}</small>
                )}
              </div>

              {/* Location */}
              <div className="form-group mb-2">
                <label className="form-label">Location :</label>
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  className={`form-control ${
                    errors.location ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.location && (
                  <small className="text-danger">{errors.location}</small>
                )}
              </div>

              {/* Photo */}
              <div className="form-group mb-2">
                <label className="form-label">Photo :</label>
                <div className="row">
                  {user.profilePhoto && (
                    <img
                      src={`${API_BASE_URL}${user.profilePhoto}`}
                      alt={user.username}
                      className="profile-edit"
                      style={{ maxWidth: "150px", marginBottom: "10px" }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="profilePhoto"
                  className="form-control my-3"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
