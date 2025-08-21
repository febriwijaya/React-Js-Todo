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

  useEffect(() => {
    listTodos();
  }, []);

  // 🔹 Ambil semua todos
  const listTodos = async () => {
    try {
      const response = await getAllTodos();
      setTodos(response.data);
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
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
          Add Todo
        </button>
      )}

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
    </div>
  );
};

export default ListTodoComponent;
