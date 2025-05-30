import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { agregarAlCarrito } from '../redux/slices/cartSlice';
import apiService from '../services/api';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                setLoading(true);
                const response = await apiService.getProductoById(id);
                if (response && response.data) {
                    setProducto(response.data);
                    setError(null);
                } else {
                    throw new Error('La respuesta de la API no tiene el formato esperado');
                }
            } catch (err) {
                console.error('Error al cargar el producto:', err);
                setError(err.response?.data?.message || 'Error al cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    const handleAgregarAlCarrito = () => {
        if (producto) {
            dispatch(agregarAlCarrito({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagenUrl: producto.imagenUrl
            }));
            navigate('/carrito');
        }
    };

    const handleCantidadChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setCantidad(value);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Cargando producto...</h2>
                <p>Por favor espere...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/productos')}>
                    Volver a Productos
                </button>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="not-found">
                <h2>Producto no encontrado</h2>
                <p>El producto que buscas no existe o ha sido eliminado.</p>
                <button onClick={() => navigate('/productos')}>
                    Volver a Productos
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <div className="product-image">
                    <img 
                        src={producto.imagenUrl} 
                        alt={producto.nombre}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400?text=No+Imagen';
                        }}
                    />
                </div>
                <div className="product-info">
                    <h1>{producto.nombre}</h1>
                    <p className="price">${producto.precio}</p>
                    <p className="description">{producto.descripcion}</p>
                    
                    <div className="quantity-selector">
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            min="1"
                            value={cantidad}
                            onChange={handleCantidadChange}
                        />
                    </div>

                    <button 
                        className="add-to-cart-button"
                        onClick={handleAgregarAlCarrito}
                    >
                        Agregar al Carrito
                    </button>

                    {/* Botones de Administración (Modificar y Eliminar) */}
                    <div className="admin-buttons">
                        <button 
                            className="modify-button"
                            onClick={() => navigate(`/productos/editar/${id}`) /* Redirigir a página de edición */}
                        >
                            Modificar Producto
                        </button>
                        <button 
                            className="delete-button"
                            onClick={async () => { // Lógica de eliminar asíncrona
                                if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                    try {
                                        await apiService.deleteProducto(id);
                                        alert('Producto eliminado con éxito!');
                                        navigate('/productos'); // Redirigir a la lista después de eliminar
                                    } catch (err) {
                                        console.error('Error al eliminar el producto:', err);
                                        alert('Error al eliminar el producto.');
                                    }
                                }
                            }}
                        >
                            Eliminar Producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail; 