import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { limpiarCarrito } from '../redux/slices/cartSlice';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';

function Pago() {
    const { items, total } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const [metodoPago, setMetodoPago] = useState('Tarjeta');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Crear el pedido
            const pedidoData = {
                usuarioId: user.id,
                detalles: items.map(item => ({
                    productoId: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio
                })),
                total: total
            };
            const pedidoResponse = await apiService.crearPedido(pedidoData);

            if (pedidoResponse && pedidoResponse.data && pedidoResponse.data.id) {
                // 2. Crear el pago asociado al pedido
                const pagoData = {
                    pedidoId: pedidoResponse.data.id,
                    metodoPago,
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
            setError('Error al procesar el pago');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Debes iniciar sesión para pagar.</div>;
    }

    if (items.length === 0) {
        return <div>No hay productos en el carrito.</div>;
    }

    return (
        <div className="pago-container">
            <h2>Formulario de Pago</h2>
            {success ? (
                <div>¡Pago realizado con éxito! Redirigiendo...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Método de pago:</label>
                        <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                    </div>
                    <div>
                        <label>Total a pagar: ${total.toFixed(2)}</label>
                    </div>
                    {error && <div style={{color: 'red'}}>{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Procesando...' : 'Pagar'}
                    </button>
                </form>
            )}
            <button
                className="checkout-button"
                onClick={() => navigate('/checkout')}
            >
                Proceder al Pago
            </button>
        </div>
    );
}

export default Pago;

