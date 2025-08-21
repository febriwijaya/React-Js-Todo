import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListTodoComponent from "./components/todos/ListTodoComponent";
import TodoComponent from "./components/todos/TodoComponent";
import RegisterComponent from "./components/users/RegisterComponent";
import LoginComponent from "./components/users/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";
import LayoutComponent from "./components/layout/LayoutComponent";
import ListUserComponent from "./components/users/ListUserComponent";
import UserProfile from "./components/users/UserProfile";
import UpdateUserComponent from "./components/users/UpdateUserComponent";
import ChangePasswordComponent from "./components/users/ChangePasswordComponent";

// Komponen untuk proteksi route
function AuthenticatedRoute({ children }) {
  const isAuth = isUserLoggedIn();
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />

        {/* Protected Routes */}
        <Route
          element={
            <AuthenticatedRoute>
              <LayoutComponent />
            </AuthenticatedRoute>
          }
        >
          {/* Semua child route otomatis protected */}
          <Route path="/todos" element={<ListTodoComponent />} />
          <Route path="/add-todo" element={<TodoComponent />} />
          <Route path="/update-todo/:id" element={<TodoComponent />} />
          <Route path="/users" element={<ListUserComponent />} />
          <Route path="/detail-profile/:username" element={<UserProfile />} />
          <Route path="/edit-profile/:id" element={<UpdateUserComponent />} />
          <Route
            path="/change-password"
            element={<ChangePasswordComponent />}
          />
        </Route>

        {/* Catch-all untuk halaman yang tidak ada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
