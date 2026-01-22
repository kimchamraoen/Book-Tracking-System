import apiClient from "./api";
// import api from "@/services/api";

// Define API endpoints
const ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  PROFILE: "/admin/profile",
  BOOK: "/admin/books",
};

// Register a new user
export const register = async (data) => {
  try {
    const response = await apiClient.post(ENDPOINTS.REGISTER, data);
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
    const response = await apiClient.post(ENDPOINTS.LOGIN, data);
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

//fetch dashboard data
// export const fetchDashboardData = async () => {
//   try {
//     const response = await api.get(ENDPOINTS.DASHBOARD);
//     return response.data;
//   } catch (error) {
//     console.error("Dashboard fetch error:", error);
//     throw error;
//   }
// }

// Fetch Books Data
export const getBooks = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.BOOK);
    return response.data;
  } catch (error) {
    console.error("Books fetch error:", error);
    throw error;
  }
};

// Fetch Admin Profile
export const getAdminProfile = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILE);
    return response.data; // Should return { name, email, role, etc. }
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};