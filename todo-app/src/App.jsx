import "./App.css";
import ListTodoComponent from "./components/ListTodoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoComponent from "./components/TodoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";
import LayoutComponent from "./components/LayoutComponent";
import ListUserComponent from "./components/ListUserComponent";
import UserProfile from "./components/UserProfile";
import UpdateUserComponent from "./components/UpdateUserComponent";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />

        {/* Protected Routes (harus login) */}
        <Route
          element={
            <AuthenticatedRoute>
              <LayoutComponent />
            </AuthenticatedRoute>
          }
        >
          <Route path="/todos" element={<ListTodoComponent />} />
          <Route path="/add-todo" element={<TodoComponent />} />
          <Route path="/update-todo/:id" element={<TodoComponent />} />
          <Route path="/users" element={<ListUserComponent />} />
          <Route path="/detail-profile/:username" element={<UserProfile />} />
          <Route path="/edit-profile/:id" element={<UpdateUserComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
