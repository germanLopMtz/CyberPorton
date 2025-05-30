import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
    cantidad: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        agregarAlCarrito: (state, action) => {
            const { id, nombre, precio, imagenUrl } = action.payload;
            const itemExistente = state.items.find(item => item.id === id);

            if (itemExistente) {
                itemExistente.cantidad += 1;
            } else {
                state.items.push({
                    id,
                    nombre,
                    precio,
                    imagenUrl,
                    cantidad: 1
                });
            }

            // Actualizar total y cantidad
            state.cantidad = state.items.reduce((total, item) => total + item.cantidad, 0);
            state.total = state.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        },
        quitarDelCarrito: (state, action) => {
            const id = action.payload;
            const itemExistente = state.items.find(item => item.id === id);

            if (itemExistente) {
                if (itemExistente.cantidad === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    itemExistente.cantidad -= 1;
                }
            }

            // Actualizar total y cantidad
            state.cantidad = state.items.reduce((total, item) => total + item.cantidad, 0);
            state.total = state.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        },
        eliminarDelCarrito: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);

            // Actualizar total y cantidad
            state.cantidad = state.items.reduce((total, item) => total + item.cantidad, 0);
            state.total = state.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        },
        limpiarCarrito: (state) => {
            state.items = [];
            state.total = 0;
            state.cantidad = 0;
        }
    }
});

export const { 
    agregarAlCarrito, 
    quitarDelCarrito, 
    eliminarDelCarrito, 
    limpiarCarrito 
} = cartSlice.actions;

export default cartSlice.reducer; 