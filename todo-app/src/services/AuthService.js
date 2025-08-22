import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

// Get all users
export const getAllRegister = () =>
  axios.get(AUTH_REST_API_BASE_URL + "/users");

// Get user by username
export const getUserByUsername = (username) =>
  axios.get(AUTH_REST_API_BASE_URL + "/users/username" + "/" + username);

// get user by user id
export const getUserById = (id) =>
  axios.get(AUTH_REST_API_BASE_URL + "/users/" + id);

// Update user (PUT dengan form-data)
export const updateUser = (id, user, photoFile) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(user)], { type: "application/json" })
  );
  if (photoFile) {
    formData.append("photo", photoFile);
  }

  return axios.put(`${AUTH_REST_API_BASE_URL}/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Register API (POST dengan form-data)
export const registerAPICall = (userObj, photoFile) => {
  const formData = new FormData();

  // masukkan object user ke dalam key "data" (sebagai JSON string)
  formData.append(
    "data",
    new Blob([JSON.stringify(userObj)], { type: "application/json" })
  );

  // tambahkan photo jika ada
  if (photoFile) {
    formData.append("photo", photoFile);
  }

  return axios.post(`${AUTH_REST_API_BASE_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Login API
export const loginAPICall = (usernameOrEmail, password) =>
  axios.post(AUTH_REST_API_BASE_URL + "/login", { usernameOrEmail, password });

// change password
export const changePassword = (username, passwordData) =>
  axios.put(
    `${AUTH_REST_API_BASE_URL}/update-password/username/${username}`,
    passwordData
  );

export const deleteUsersById = (id) =>
  axios.delete(AUTH_REST_API_BASE_URL + "/delete/" + id);

// Simpan token di localStorage
export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// Simpan user login di sessionStorage
export const saveLoggedInUser = (usernameOrEmail, role) => {
  sessionStorage.setItem("authenticatedUser", usernameOrEmail); // username/email
  sessionStorage.setItem("role", role);
};

// Cek apakah user sudah login
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username != null;
};

// Ambil username/email user login
export const getLoggedInUser = () => {
  return sessionStorage.getItem("authenticatedUser");
};

// Ambil role user
export const getUserRole = () => {
  return sessionStorage.getItem("role");
};

// Logout
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// Cek apakah user admin
export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");
  return role === "ROLE_ADMIN";
};

// Ambil user yang sedang login (username/email)
export const getCurrentUser = () => {
  return sessionStorage.getItem("authenticatedUser"); // konsisten pakai sessionStorage
};
