import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/ordersSlice';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const ordersList = Array.isArray(orders) ? orders : [];

  if (!user) {
    return (
      <div className="orders-container">
        <div className="not-logged-in">
          <h2>Debes iniciar sesión para ver tus pedidos</h2>
          <Link to="/login" className="login-button">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="orders-container">
        <div className="loading">Cargando pedidos...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="orders-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (ordersList.length === 0) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <h2>No tienes pedidos aún</h2>
          <Link to="/productos" className="shop-button">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Mis Pedidos</h1>
      <div className="orders-list">
        {ordersList.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Pedido #{order.id}</h3>
              <span className={`order-status ${order.estado.toLowerCase()}`}>
                {order.estado}
              </span>
            </div>

            <div className="order-details">
              <p>Fecha: {new Date(order.fechaPedido).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>

            {Array.isArray(order.detalles) && order.detalles.length > 0 && (
              <div className="order-items">
                {order.detalles.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="item-info">
                      <h4>{item.nombreProducto}</h4>
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Precio unitario: ${item.precioUnitario}</p>
                      <p>Subtotal: ${item.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link to={`/pedidos/${order.id}`} className="view-order">
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;