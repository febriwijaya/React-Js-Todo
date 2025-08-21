import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/AuthService";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
// import "./style.css"; // pastikan file ini ada

const UserProfile = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { username } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserByUsername(username)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load user profile");
        setLoading(false);
      });
  }, [username]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  function editProfile(id) {
    navigate(`/edit-profile/${id}`);
  }

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="profile-card">
      {/* Cover tipis agar berasa LinkedIn */}
      <div className="profile-cover" />

      {/* Avatar overlap & motong bagian atas card */}
      <div className="profile-avatar-wrap">
        {user?.profilePhoto ? (
          <img
            src={`${API_BASE_URL}${user.profilePhoto}`}
            alt={user.username}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar placeholder">
            <AiOutlineUser className="placeholder-icon" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="profile-body">
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-username">@{user?.username}</p>
        <p className="profile-title">{user?.jobTitle || "No Job Title"}</p>

        <ul className="profile-meta">
          <li>
            <FiMail /> <span>{user?.email}</span>
          </li>
          <li>
            <FiMapPin /> <span>{user?.location || "Unknown"}</span>
          </li>
          <li>
            <FiCalendar /> <span>{formatDate(user?.birthDate)}</span>
          </li>
        </ul>

        <div className="profile-actions">
          <button
            className="btn btn-primary"
            onClick={() => editProfile(user.id)}
          >
            Edit Profile
          </button>
          <button className="btn btn-danger" onClick={() => changePassword()}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
