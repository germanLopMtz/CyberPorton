import axios from 'axios';

const API_URL = 'https://localhost:7297/api'; // Ajusta esto según tu puerto de backend

// Configuración base de axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la llamada a la API:', error);
        return Promise.reject(error);
    }
);

export const apiService = {
    // Autenticación
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/Auth/login`, credentials);
        return response;
    },

    register: async (userData) => {
        const response = await axios.post(`${API_URL}/Auth/register`, userData);
        return response;
    },

    // Categorías
    getCategorias: async () => {
        const response = await axios.get(`${API_URL}/Categorias`);
        return response;
    },

    createCategoria: async (categoriaData) => {
        const response = await axios.post(`${API_URL}/Categorias`, categoriaData);
        return response;
    },

    getProductosByCategoria: async (categoriaId) => {
        const response = await axios.get(`${API_URL}/Productos/categoria/${categoriaId}`);
        return response;
    },

    // Productos
    getProductos: async () => {
        const response = await axios.get(`${API_URL}/Productos`);
        return response;
    },

    getProductoById: async (id) => {
        const response = await axios.get(`${API_URL}/Productos/${id}`);
        return response;
    },

    createProducto: (data) => api.post('/Productos', data),
    updateProducto: (id, data) => api.put(`/Productos/${id}`, data),
    deleteProducto: (id) => api.delete(`/Productos/${id}`),

    // Pedidos
    getPedidos: async () => {
        const response = await axios.get(`${API_URL}/Pedidos`);
        return response;
    },

    getPedidoById: async (id) => {
        const response = await axios.get(`${API_URL}/Pedidos/${id}`);
        return response;
    },

    crearPedido: async (pedidoData) => {
        const response = await axios.post(`${API_URL}/Pedidos`, pedidoData);
        return response;
    },

    updatePedido: (id, data) => api.put(`/Pedidos/${id}`, data),
    deletePedido: (id) => api.delete(`/Pedidos/${id}`),

    // Pagos
    getPagos: () => api.get('/Pagos'),
    getPagoById: (id) => api.get(`/Pagos/${id}`),
    createPago: (data) => api.post('/Pagos', data),
    updatePago: (id, data) => api.put(`/Pagos/${id}`, data),
    deletePago: (id) => api.delete(`/Pagos/${id}`),
};

export default apiService; 