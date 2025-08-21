import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, todoUpdate } from "../../services/TodoServices";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("false"); // default string "false"
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateTodo = async (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      completed: completed === "true", // pastikan boolean
    };

    try {
      if (id) {
        await todoUpdate(id, todo);
        Swal.fire("Berhasil!", "Todo berhasil diedit.", "success");
      } else {
        await saveTodo(todo);
        Swal.fire("Berhasil!", "Todo berhasil ditambahkan.", "success");
      }
      navigate("/todos");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        (id
          ? "Terjadi kesalahan saat edit data."
          : "Terjadi kesalahan saat menambahkan data.");
      Swal.fire("Gagal!", errorMessage, "error");
    }
  };

  const pageTitle = () => (
    <h2 className="text-center">{id ? "Update Todo" : "Add Todo"}</h2>
  );

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        if (id) {
          const response = await getTodo(id);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(String(response.data.completed)); // convert ke string untuk <select>
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Gagal!", "Tidak bisa mengambil data todo.", "error");
      }
    };
    fetchTodo();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateTodo}>
              <div className="form-group mb-2">
                <label className="form-label">Todo Title :</label>
                <input
                  type="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Description :</label>
                <input
                  type="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Completed :</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                  required
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
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

export default TodoComponent;
