import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCurrentUser,
  getUserById,
  updateUser,
} from "../services/AuthService";
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
    profilePhoto: "", // string path photo lama
  });
  const [photoFile, setPhotoFile] = useState(null); // simpan file baru

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error!", "Gagal mengambil data user.", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto") {
      setPhotoFile(files[0]); // simpan file upload
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const editUserProfile = (e) => {
    e.preventDefault();

    updateUser(id, user, photoFile)
      .then(() => {
        Swal.fire("Berhasil!", "User berhasil diperbarui.", "success");
        // redirect ke halaman detail profile pakai username yang baru diupdate
        navigate(`/detail-profile/${currentUser}`);
      })
      .catch((error) => {
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
      });
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
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="form-group mb-2">
                <label className="form-label">Username :</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="form-group mb-2">
                <label className="form-label">Email :</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Birth Date */}
              <div className="form-group mb-2">
                <label className="form-label">Birth Date :</label>
                <input
                  type="date"
                  name="birthDate"
                  value={user.birthDate}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Job Title */}
              <div className="form-group mb-2">
                <label className="form-label">Job Title :</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={user.jobTitle}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div className="form-group mb-2">
                <label className="form-label">Location :</label>
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  className="form-control"
                  onChange={handleChange}
                />
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
