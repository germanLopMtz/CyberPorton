import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../../config';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      console.log('Iniciando createOrder con datos:', orderData);
      console.log('Headers:', getAuthHeaders());
      
      const response = await axios.post(`${API_URL}/Pedidos`, orderData, { 
        headers: getAuthHeaders() 
      });
      
      console.log('Respuesta de createOrder:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error en createOrder:', err.response || err);
      return rejectWithValue(err.response?.data || 'Error al crear el pedido');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('Iniciando fetchUserOrders para usuario:', userId);
      console.log('Headers:', getAuthHeaders());
      
      const response = await axios.get(`${API_URL}/Pedidos/usuario/${userId}`, { 
        headers: getAuthHeaders() 
      });
      
      console.log('Respuesta de fetchUserOrders:', response.data);
      // Asegurarse de que la respuesta sea un array
      const orders = response.data;
      return Array.isArray(orders) ? orders : [];
    } catch (err) {
      console.error('Error en fetchUserOrders:', err.response || err);
      return rejectWithValue(err.response?.data || 'Error al obtener los pedidos');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    ordersList: [],
    currentOrder: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        console.log('Estado: createOrder.pending');
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log('Estado: createOrder.fulfilled con payload:', action.payload);
        state.status = 'succeeded';
        state.currentOrder = action.payload;
        if (!Array.isArray(state.orders)) {
          state.orders = [];
        }
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log('Estado: createOrder.rejected con error:', action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Error al crear el pedido';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        console.log('Estado: fetchUserOrders.pending');
        state.status = 'loading';
        state.orders = [];
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        console.log('Estado: fetchUserOrders.fulfilled con payload:', action.payload);
        state.status = 'succeeded';
        state.orders = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        console.log('Estado: fetchUserOrders.rejected con error:', action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Error al obtener los pedidos';
        state.orders = [];
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;