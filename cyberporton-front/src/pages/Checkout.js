import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { limpiarCarrito } from '../redux/slices/cartSlice';
import apiService from '../services/api';
import './Checkout.css';

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const pedidoData = {
                usuarioId: user.id,
                items: items.map(item => ({
                    productoId: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio
                })),
                total: total,
                direccion: formData.direccion,
                ciudad: formData.ciudad,
                codigoPostal: formData.codigoPostal,
                telefono: formData.telefono
            };

            const response = await apiService.crearPedido(pedidoData);
            
            if (response && response.data) {
                dispatch(limpiarCarrito());
                // Redirige a la lista de pedidos, no al detalle
                navigate('/pedidos');
            } else {
                throw new Error('Error al procesar el pedido');
            }
        } catch (err) {
            console.error('Error al procesar el pedido:', err);
            setError(err.response?.data?.message || 'Error al procesar el pedido');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="checkout-login-required">
                <h2>Inicia sesión para continuar</h2>
                <p>Necesitas iniciar sesión para realizar un pedido.</p>
                <button onClick={() => navigate('/login')}>
                    Ir a Iniciar Sesión
                </button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega algunos productos antes de proceder al pago.</p>
                <button onClick={() => navigate('/productos')}>
                    Ver Productos
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Finalizar Compra</h1>
            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form">
                    <h2>Información de Envío</h2>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección:</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad:</label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codigoPostal">Código Postal:</label>
                        <input
                            type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            value={formData.codigoPostal}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar Pedido'}
                    </button>
                </form>

                <div className="order-summary">
                    <h2>Resumen del Pedido</h2>
                    <div className="summary-items">
                        {items.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.nombre} x {item.cantidad}</span>
                                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;