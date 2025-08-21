import React, { useEffect, useState } from "react";
import { getAllRegister } from "../services/AuthService";

const ListUserComponent = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listUsersComponent();
  }, []);

  function listUsersComponent() {
    getAllRegister()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 🔹 Fungsi untuk format tanggal ke format Indonesia
  function formatDate(dateString) {
    if (!dateString) return "-"; // kalau null/undefined
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
  return (
    <div className="container">
      <h2 className="text-center">List of Register</h2>
      {/* {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
          Add Todo
        </button>
      )} */}

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.birthDate)}</td>
                <td>{user.jobTitle}</td>
                <td>{user.location}</td>
                <td>
                  {user.profilePhoto ? (
                    <img
                      src={`${API_BASE_URL}${user.profilePhoto}`}
                      alt={user.username}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="text-muted">No Photo</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-info mx-2"
                    // onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger mx-2"
                    // onClick={() => deleteTodoId(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUserComponent;
