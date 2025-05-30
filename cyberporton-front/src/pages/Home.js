import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a CyberPorton</h1>
        <p>Tu tienda de tecnología favorita</p>
        <Link to="/productos" className="cta-button">
          Ver Productos
        </Link>
      </section>

      <section className="featured-categories">
        <h2>Categorías Destacadas</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Laptops</h3>
            <Link to="/productos?categoria=laptops">Ver más</Link>
          </div>
          <div className="category-card">
            <h3>Smartphones</h3>
            <Link to="/productos?categoria=smartphones">Ver más</Link>
          </div>
          <div className="category-card">
            <h3>Accesorios</h3>
            <Link to="/productos?categoria=accesorios">Ver más</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>🚚 Envío Gratis</h3>
          <p>En compras mayores a $1000</p>
        </div>
        <div className="feature">
          <h3>💳 Pago Seguro</h3>
          <p>Múltiples métodos de pago</p>
        </div>
        <div className="feature">
          <h3>🛡️ Garantía</h3>
          <p>30 días de garantía en todos los productos</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 