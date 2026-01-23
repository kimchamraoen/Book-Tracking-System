import api from "./api";

// Define API endpoints
const ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  PROFILE: "/admin/profile",
  BOOK: "/books",
};

// Register a new user
export const register = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.REGISTER, data);
    return response.data; // Return relevant data from response
  } catch (error) {
    // Handle registration error
    console.error("Registration error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Log in a user
export const login = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, data);
    // Assuming you receive a token in response
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    console.log("Login response data:", response.data.user);
    return response.data; // Return relevant data from response
  } catch (error) {
    // Handle login error
    console.error("Login error:", error);
    throw error; // Propagate the error for further handling
  }
};

// Logout the user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Optionally perform additional actions, like redirecting
};
