import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api';
import './ProductList.css';

function ProductList() {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                console.log('Intentando cargar productos...');
                let response;
                
                if (categoriaId) {
                    response = await apiService.getProductosByCategoria(categoriaId);
                } else {
                    response = await apiService.getProductos();
                }

                console.log('Respuesta de la API:', response);
                
                if (response && response.data) {
                    setProductos(response.data);
                    setError(null);
                } else {
                    throw new Error('La respuesta de la API no tiene el formato esperado');
                }
            } catch (err) {
                console.error('Error detallado:', err);
                setError(err.response?.data?.message || 'Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, [categoriaId]);

    if (loading) return (
        <div className="loading">
            <h2>Cargando productos...</h2>
            <p>Por favor espere...</p>
        </div>
    );

    if (error) return (
        <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
    );

    if (!productos || productos.length === 0) {
        return (
            <div className="no-products">
                <h2>No hay productos disponibles</h2>
                <p>Por favor, intente más tarde o contacte al administrador.</p>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <h1>{categoriaId ? 'Productos por Categoría' : 'Nuestros Productos'}</h1>
            <div className="product-grid">
                {productos.map((producto) => (
                    <div key={producto.id} className="product-card">
                        <img 
                            src={producto.imagenUrl} 
                            alt={producto.nombre}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=No+Imagen';
                            }}
                        />
                        <h3>{producto.nombre}</h3>
                        <p className="price">${producto.precio}</p>
                        <p className="description">{producto.descripcion}</p>
                        <Link to={`/productos/${producto.id}`} className="view-button">
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList; 