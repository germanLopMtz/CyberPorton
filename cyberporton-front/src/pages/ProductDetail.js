import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div className="loading">Cargando producto...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error">Producto no encontrado</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      
      <div className="product-info">
        <h1>{product.nombre}</h1>
        <p className="price">${product.precio}</p>
        
        <div className="description">
          <h2>Descripción</h2>
          <p>{product.descripcion}</p>
        </div>

        <div className="specifications">
          <h2>Especificaciones</h2>
          <ul>
            {product.especificaciones?.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>

        <button
          className="add-to-cart"
          onClick={() => dispatch(addToCart(product))}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 