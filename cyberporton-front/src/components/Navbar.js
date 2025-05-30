import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CyberPorton</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/productos">Productos</Link>
        {user ? (
          <>
            <Link to="/pedidos">Mis Pedidos</Link>
            <Link to="/perfil">Mi Perfil</Link>
          </>
        ) : (
          <Link to="/login">Iniciar Sesión</Link>
        )}
        <Link to="/carrito" className="cart-link">
          🛒 ({items.length})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 