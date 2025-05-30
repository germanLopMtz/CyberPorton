import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate('/productos')}>
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Carrito de Compras</h1>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imagen} alt={item.nombre} />
            
            <div className="item-details">
              <h3>{item.nombre}</h3>
              <p className="price">${item.precio}</p>
            </div>

            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="item-total">
              ${(item.precio * item.quantity).toFixed(2)}
            </p>

            <button
              className="remove-item"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Resumen del Pedido</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button
          className="checkout-button"
          onClick={handleCheckout}
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default Cart; 