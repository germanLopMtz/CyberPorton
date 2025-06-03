import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/ordersSlice';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && (!orders || orders.length === 0)) {
      dispatch(fetchUserOrders(user.id));
    }
    if (!user) {
      navigate('/login');
    }
  }, [user, orders, dispatch, navigate]);

  const order = orders?.find(order => order.id === parseInt(id));

  if (!order) {
    return (
      <div className="order-detail-container">
        <div className="error">Error: Pedido no encontrado.</div>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <h1>Detalles del Pedido #{order.id}</h1>
      <div className="order-detail-card">
        <div className="order-header">
          <div className="order-info">
            <p>Fecha: {new Date(order.fechaPedido).toLocaleDateString()}</p>
            <p>Estado: <span className={`order-status ${order.estado.toLowerCase()}`}>{order.estado}</span></p>
          </div>
          <div className="order-total">
            <h3>Total: ${order.total.toFixed(2)}</h3>
          </div>
        </div>
        <div className="order-items">
          <h2>Productos</h2>
          {order.detalles.map((item, idx) => (
            <div key={idx} className="order-item">
              <div className="item-info">
                <h3>{item.nombreProducto}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.precioUnitario}</p>
                <p>Subtotal: ${item.subtotal}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate('/pedidos')}>
          Volver a Mis Pedidos
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;