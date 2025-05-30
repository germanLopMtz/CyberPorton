import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './CategoryList.css';

function CategoryList() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                setLoading(true);
                const response = await apiService.getCategorias();
                if (response && response.data) {
                    setCategorias(response.data);
                    setError(null);
                } else {
                    throw new Error('La respuesta de la API no tiene el formato esperado');
                }
            } catch (err) {
                console.error('Error al cargar las categorías:', err);
                setError(err.response?.data?.message || 'Error al cargar las categorías');
            } finally {
                setLoading(false);
            }
        };

        cargarCategorias();
    }, []);

    const handleCategoriaClick = (categoriaId) => {
        navigate(`/productos/categoria/${categoriaId}`);
    };

    if (loading) {
        return (
            <div className="category-list-loading">
                <p>Cargando categorías...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="category-list-error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="category-list">
            <div className="category-list-header">
                <h2>Categorías</h2>
                <button className="add-category-button" onClick={() => navigate('/categorias/crear')}>
                    + Agregar Categoría
                </button>
            </div>
            <div className="category-grid">
                {categorias.map((categoria) => (
                    <div
                        key={categoria.id}
                        className="category-card"
                        onClick={() => handleCategoriaClick(categoria.id)}
                    >
                        {categoria.imagenUrl && (
                            <img
                                src={categoria.imagenUrl}
                                alt={categoria.nombre}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150?text=Categoria';
                                }}
                            />
                        )}
                        <h3>{categoria.nombre}</h3>
                        <p>{categoria.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList; 