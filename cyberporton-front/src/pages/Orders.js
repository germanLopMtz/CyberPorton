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

  if (orders.length === 0) {
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
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Pedido #{order.id}</h3>
              <span className={`order-status ${order.estado.toLowerCase()}`}>
                {order.estado}
              </span>
            </div>

            <div className="order-details">
              <p>Fecha: {new Date(order.fecha).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="item-info">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.cantidad}</p>
                    <p>Precio: ${item.precio}</p>
                  </div>
                </div>
              ))}
            </div>

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