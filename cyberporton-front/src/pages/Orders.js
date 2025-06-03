import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/ordersSlice';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  // DEBUG: Verifica qué pedidos llegan
  console.log('Pedidos recibidos:', orders);

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
    return <div>Cargando pedidos...</div>;
  }

  if (!orders || orders.length === 0) {
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
            <h3>Pedido #{order.id}</h3>
            <p>Fecha: {new Date(order.fechaPedido).toLocaleDateString()}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Estado: {order.estado || 'Pendiente'}</p>
            {/* Renderiza detalles aquí */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;