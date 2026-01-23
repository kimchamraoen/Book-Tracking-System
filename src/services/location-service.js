import api from './api'

// Define API endpoints
const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/admin/profile',
  //   BOOK: "/books",
  LOCATION: '/locations',
}

export const getAllLocations = async () => {
  const response = await api.get(ENDPOINTS.LOCATION) // Hits GET /locations
  return response.data
}