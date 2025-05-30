import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  const order = orders.find(order => order.id === parseInt(id));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!order) {
    return (
      <div className="order-detail-container">
        <div className="error">Pedido no encontrado</div>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <h1>Detalles del Pedido #{order.id}</h1>

      <div className="order-detail-card">
        <div className="order-header">
          <div className="order-info">
            <p>Fecha: {new Date(order.fecha).toLocaleDateString()}</p>
            <p>Estado: <span className={`order-status ${order.estado.toLowerCase()}`}>{order.estado}</span></p>
          </div>
          <div className="order-total">
            <h3>Total: ${order.total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="order-items">
          <h2>Productos</h2>
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.imagen} alt={item.nombre} />
              <div className="item-info">
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.precio}</p>
                <p>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="shipping-info">
          <h2>Información de Envío</h2>
          <p>Dirección: {order.direccionEnvio}</p>
          {order.numeroSeguimiento && (
            <p>Número de Seguimiento: {order.numeroSeguimiento}</p>
          )}
        </div>

        <button className="back-button" onClick={() => navigate('/pedidos')}>
          Volver a Mis Pedidos
        </button>
      </div>
    </div>
  );
};

export default OrderDetail; 