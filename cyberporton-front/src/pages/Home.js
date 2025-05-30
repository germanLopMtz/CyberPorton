import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CategoryList from '../components/CategoryList';

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
        <CategoryList />
      </section>

    </div>
  );
};

export default Home; 