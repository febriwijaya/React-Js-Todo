import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../../services/TodoServices";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../../services/AuthService";
import Swal from "sweetalert2";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const [page, setPage] = useState(0);
  const [size] = useState(10); // default 10 per halaman
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    listTodos(page);
  }, [page]);

  // 🔹 Ambil semua todos
  const listTodos = async (pageNum) => {
    try {
      const response = await getAllTodos(pageNum, size);
      setTodos(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching todos:", error);
      Swal.fire("Error", "Gagal mengambil data todos!", "error");
    }
  };

  const addNewTodo = () => navigate("/add-todo");

  const updateTodo = (id) => navigate(`/update-todo/${id}`);

  // 🔹 Hapus todo
  const deleteTodoId = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deleteTodo(id);
        Swal.fire("Berhasil!", "Todo berhasil dihapus.", "success");
        listTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
    }
  };

  // 🔹 Tandai todo sebagai selesai
  const completeTodoById = async (id) => {
    try {
      await completeTodo(id);
      listTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
      Swal.fire("Error", "Gagal menandai todo sebagai selesai.", "error");
    }
  };

  // 🔹 Tandai todo sebagai belum selesai
  const inCompleteTodoById = async (id) => {
    try {
      await inCompleteTodo(id);
      listTodos();
    } catch (error) {
      console.error("Error marking todo incomplete:", error);
      Swal.fire("Error", "Gagal menandai todo sebagai belum selesai.", "error");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>

      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              {isAdmin && <th>Created By</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.completed ? "YES" : "NO"}</td>
                  {isAdmin && <td>{todo.createdBy}</td>}
                  <td>
                    <button
                      className="btn btn-info mx-2"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteTodoId(todo.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-success mx-2"
                      onClick={() => completeTodoById(todo.id)}
                    >
                      Completed
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => inCompleteTodoById(todo.id)}
                    >
                      In Completed
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center">
                  Tidak ada todo ditemukan.
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

export default ListTodoComponent;
