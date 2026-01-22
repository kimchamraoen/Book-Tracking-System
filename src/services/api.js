import axios from 'axios';

const apiClient = axios.create({
  // Ensure this URL includes the /stage (e.g., /dev or /prod)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST Interceptor: Attach the token to every call
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE Interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // If we get a 401, the token might be expired
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
