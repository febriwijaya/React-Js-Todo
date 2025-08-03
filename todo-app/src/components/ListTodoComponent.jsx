import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../services/TodoServices";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function updateTodo(id) {
    console.log(id);
    navigate(`/update-todo/${id}`);
  }

  function deleteTodoId(id) {
    deleteTodo(id)
      .then((response) => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function completeTodoById(id) {
    completeTodo(id)
      .then((response) => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function inCompleteTodoById(id) {
    inCompleteTodo(id)
      .then((response) => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-info mx-2"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteTodoId(todo.id)}
                    >
                      Delete
                    </button>
                  )}

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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
