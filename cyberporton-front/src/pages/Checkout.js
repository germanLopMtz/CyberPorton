import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/slices/ordersSlice';
import { clearCart } from '../redux/slices/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    direccionEnvio: user?.direccion || '',
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      items: items.map(item => ({
        id: item.id,
        cantidad: item.quantity,
        precio: item.precio
      })),
      total,
      direccionEnvio: formData.direccionEnvio,
      metodoPago: formData.metodoPago,
      usuarioId: user.id
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate('/pedidos');
    } catch (error) {
      alert('Error al procesar el pedido. Por favor, intente nuevamente.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Tu carrito está vacío</h2>
          <button onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>

      <div className="checkout-content">
        <div className="order-summary">
          <h2>Resumen del Pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.imagen} alt={item.nombre} />
              <div className="item-details">
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.precio}</p>
                <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Información de Envío</h2>
            <div className="form-group">
              <label htmlFor="direccionEnvio">Dirección de Envío</label>
              <input
                type="text"
                id="direccionEnvio"
                name="direccionEnvio"
                value={formData.direccionEnvio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Método de Pago</h2>
            <div className="form-group">
              <label htmlFor="metodoPago">Seleccionar Método de Pago</label>
              <select
                id="metodoPago"
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                required
              >
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {formData.metodoPago === 'tarjeta' && (
              <>
                <div className="form-group">
                  <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
                    value={formData.numeroTarjeta}
                    onChange={handleChange}
                    required
                    maxLength="16"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                    <input
                      type="text"
                      id="fechaVencimiento"
                      name="fechaVencimiento"
                      value={formData.fechaVencimiento}
                      onChange={handleChange}
                      required
                      placeholder="MM/AA"
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      maxLength="3"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button type="submit" className="checkout-button">
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 