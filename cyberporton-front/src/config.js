// Configuración de la API
export const API_URL = 'http://localhost:5018/api'; // Cambia esto por la URL de tu API

// Configuración de axios
export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
};

// Función para obtener el token de autenticación
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Función para configurar los headers de autenticación
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    ...axiosConfig.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
}; 