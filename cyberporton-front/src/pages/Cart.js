import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    agregarAlCarrito, 
    quitarDelCarrito, 
    eliminarDelCarrito, 
    limpiarCarrito 
} from '../redux/slices/cartSlice';
import './Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const { items, total, cantidad } = useSelector(state => state.cart);

    const handleAgregar = (producto) => {
        dispatch(agregarAlCarrito(producto));
    };

    const handleQuitar = (id) => {
        dispatch(quitarDelCarrito(id));
    };

    const handleEliminar = (id) => {
        dispatch(eliminarDelCarrito(id));
    };

    const handleLimpiar = () => {
        dispatch(limpiarCarrito());
    };

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>¡Agrega algunos productos para comenzar a comprar!</p>
                <Link to="/productos" className="continue-shopping">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Carrito de Compras</h1>
            <div className="cart-content">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imagenUrl} alt={item.nombre} />
                            <div className="item-details">
                                <h3>{item.nombre}</h3>
                                <p className="price">${item.precio}</p>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuitar(item.id)}>-</button>
                                <span>{item.cantidad}</span>
                                <button onClick={() => handleAgregar(item)}>+</button>
                            </div>
                            <p className="item-total">${(item.precio * item.cantidad).toFixed(2)}</p>
                            <button 
                                className="remove-item"
                                onClick={() => handleEliminar(item.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <div className="summary-item">
                        <span>Total de Productos:</span>
                        <span>{cantidad}</span>
                    </div>
                    <div className="summary-item">
                        <span>Total a Pagar:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-button">
                        Proceder al Pago
                    </button>
                    <button className="clear-cart" onClick={handleLimpiar}>
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart; 