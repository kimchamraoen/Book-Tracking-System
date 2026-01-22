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

// Fetch Books Data
export const getBooks = async () => {
  try {
    const response = await api.get(ENDPOINTS.BOOK);
    // Log this to see what the backend is actually sending
    console.log("Backend Raw Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Books fetch error:", error);
    throw error;
  }
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  try {
    // This creates a URL like: https://...amazonaws.com/dev/admin/books/123
    const response = await api.get(`${ENDPOINTS.BOOK}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// Update a book by ID
export const updateBook = async (id, bookData) => {
  try {
    // This sends a PUT request to .../dev/admin/books/{id}
    const response = await api.put(`${ENDPOINTS.BOOK}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

//create a new book
export const createBook = async (bookData) => {
  try {
    const response = await api.post(ENDPOINTS.BOOK, bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

//celete a book by ID
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINTS.BOOK}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Fetch Admin Profile
export const getAdminProfile = async () => {
  try {
    const response = await api.get(ENDPOINTS.PROFILE);
    return response.data; // Should return { name, email, role, etc. }
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};