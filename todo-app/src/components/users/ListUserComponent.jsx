import React, { useEffect, useState } from "react";
import { deleteUsersById, getAllRegister } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ListUserComponent = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10); // default 5 per halaman
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    listUsersComponent(page);
  }, [page]);

  // 🔹 Ambil data user dengan async/await + try/catch
  const listUsersComponent = async (pageNum) => {
    try {
      const response = await getAllRegister(pageNum, size);
      setUsers(response.data.data); // <- data array
      setTotalPages(response.data.total_pages); // <- total pages
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Gagal!", "Tidak bisa memuat data pengguna.", "error");
    }
  };

  // 🔹 Format tanggal ke format Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // 🔹 Edit profile
  const editProfile = (id) => {
    navigate(`/edit-profile/${id}`, { state: { from: "users" } });
  };

  // 🔹 Hapus user (kalau service delete sudah ada)
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteUsersById(id); // aktifkan kalau service sudah ada
        Swal.fire("Berhasil!", "User berhasil dihapus.", "success");
        listUsersComponent(); // refresh list
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus user.", "error");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Register</h2>

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
            {users.length > 0 ? (
              users.map((user) => (
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
                      onClick={() => editProfile(user.id)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Control */}
      <nav aria-label="User pagination" className="mt-3">
        <ul className="pagination justify-content-center">
          {/* First Page */}
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(0)}>
              « First
            </button>
          </li>

          {/* Previous */}
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              ‹ Prev
            </button>
          </li>

          {/* Numbered Pages */}
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(i)}>
                {i + 1}
              </button>
            </li>
          ))}

          {/* Next */}
          <li
            className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next ›
            </button>
          </li>

          {/* Last Page */}
          <li
            className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setPage(totalPages - 1)}
            >
              Last »
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ListUserComponent;
