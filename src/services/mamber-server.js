import api from "./api";

// Define API endpoints
const ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  PROFILE: "/admin/profile",
  USER: "/users",
};

// Fetch Books Data
export const getUsers = async () => {
  try {
    const response = await api.get(ENDPOINTS.USER);
    // Log this to see what the backend is actually sending
    console.log("Backend user Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Books fetch error:", error);
    throw error;
  }
};

// Fetch a single book by ID
// export const getBookById = async (id) => {
//   try {
//     const response = await api.get(`${ENDPOINTS.BOOK}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching book with ID ${id}:`, error);
//     throw error;
//   }
// };

// Update a book by ID
// export const updateBook = async (id, bookData) => {
//   try {
//     // This sends a PUT request to .../dev/admin/books/{id}
//     const response = await api.put(`${ENDPOINTS.BOOK}/${id}`, bookData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating book:", error);
//     throw error;
//   }
// };

//create a new book
// export const createBook = async (bookData) => {
//   try {
//     const response = await api.post(ENDPOINTS.BOOK, bookData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating book:", error);
//     throw error;
//   }
// };

//celete a book by ID
// export const deleteBook = async (id) => {
//   try {
//     const response = await api.delete(`${ENDPOINTS.BOOK}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting book:", error);
//     throw error;
//   }
// };

// Fetch Admin Profile
// export const getAdminProfile = async () => {
//   try {
//     const response = await api.get(ENDPOINTS.PROFILE);
//     return response.data; // Should return { name, email, role, etc. }
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     throw error;
//   }
// };