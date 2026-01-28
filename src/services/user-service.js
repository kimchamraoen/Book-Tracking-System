import api from './api'

// Define API endpoints
const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
  //   BOOK: "/books",
  USER: '/users',
}

export const getAllUsers = async () => {
  const response = await api.get(ENDPOINTS.USER) // Hits GET /users
  return response.data
}

export const getUserById = async (id) => {
  const response = await api.get(`${ENDPOINTS.USER}/${id}`) // Hits GET /users/{id}
  return response.data
}

export const createUser = async (userData) => {
  const response = await api.post(ENDPOINTS.USER, userData) // Hits POST /users
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await api.put(`${ENDPOINTS.USER}/${id}`, userData) // Hits PUT /users/{id}
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`${ENDPOINTS.USER}/${id}`) // Hits DELETE /users/{id}
  return response.data
}

export const getProfile = async () => {
  // This hits your backend profile endpoint
  const response = await api.get(ENDPOINTS.PROFILE)
  return response.data
}

export const getUsersByRole = async (role = 'user') => {
  const params = role ? { role } : {}
  const response = await api.get('/users', { params })
  return response.data
}
