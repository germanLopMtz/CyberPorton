import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('categoria');
  
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = category
    ? products.filter(product => product.categoria === category)
    : products;

  if (status === 'loading') {
    return <div className="loading">Cargando productos...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-list">
      {category && (
        <h2 className="category-title">
          Productos en la categoría: {category}
        </h2>
      )}
      
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imagenUrl} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <h3>{product.descripcion}</h3>
            <h3>{product.precio}</h3>
            <h3>{product.stock}</h3>
            <h3>{product.categoriaNombre}</h3>
            <p className="price">${product.precio}</p>
            <button
              className="add-to-cart"
              onClick={() => dispatch(addToCart(product))}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 