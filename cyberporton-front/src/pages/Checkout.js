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
    const [metodoPago, setMetodoPago] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

            // Solo usuarioId y detalles
            const pedidoData = {
                usuarioId: user.id,
                detalles: items.map(item => ({
                    productoId: item.id,
                    cantidad: item.cantidad
                }))
            };

            const response = await apiService.crearPedido(pedidoData);

            if (response && response.data && response.data.id) {
                // Crear el pago
                const pagoData = {
                    pedidoId: response.data.id,
                    metodoPago: metodoPago,
                    monto: total
                };
                await apiService.createPago(pagoData);

                dispatch(limpiarCarrito());
                setSuccess(true);
                setTimeout(() => {
                    navigate('/pedidos');
                }, 2000);
            } else {
                throw new Error('Error al procesar el pedido');
            }
        } catch (err) {
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
                {success ? (
                    <div className="success-message">
                        <span role="img" aria-label="check" style={{fontSize: '2rem'}}>✅</span>
                        <p>¡Pago realizado con éxito! Redirigiendo a tus pedidos...</p>
                    </div>
                ) : (
                <>
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
                    <div className="form-group">
                        <label htmlFor="metodoPago">Método de Pago:</label>
                        <select
                            id="metodoPago"
                            name="metodoPago"
                            value={metodoPago}
                            onChange={e => setMetodoPago(Number(e.target.value))}
                            required
                        >
                            <option value={1}>Tarjeta de Crédito</option>
                            <option value={2}>Tarjeta de Débito</option>
                            <option value={3}>Paypal</option>
                            <option value={4}>OXXO</option>
                        </select>
                    </div>

                    {error && (
                      <div className="error-message">
                        {typeof error === 'object' && error !== null
                          ? error.mensaje || JSON.stringify(error)
                          : error}
                      </div>
                    )}

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar Pedido y Pagar'}
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
                </>
                )}
            </div>
        </div>
    );
}

export default Checkout;