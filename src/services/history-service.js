import api from './api'

// Define API endpoints
const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/admin/profile',
  //   BOOK: "/books",
  HISTORY: '/history',
}

export const getAllHistory = async () => {
  try {
    const response = await api.get('/history')
    // Ensure we return the array part of the response
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('API Error fetching history:', error)
    return [] // Return empty array so .filter() doesn't crash
  }
}
