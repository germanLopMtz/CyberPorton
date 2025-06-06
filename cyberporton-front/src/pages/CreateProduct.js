import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './CreateProduct.css';

function CreateProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        categoriaId: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Cargar categorías al montar el componente
        apiService.getCategorias().then(res => {
            setCategorias(res.data);
        }).catch(() => setCategorias([]));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiService.createProducto({
                ...formData,
                categoriaId: parseInt(formData.categoriaId, 10)
            });
            navigate('/productos'); // Redirige a la lista de productos
        } catch (err) {
            setError('Error al crear el producto');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <h1>Crear Nuevo Producto</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="create-product-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagenUrl">URL de la Imagen:</label>
                    <input
                        type="url"
                        id="imagenUrl"
                        name="imagenUrl"
                        value={formData.imagenUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoriaId">Categoría:</label>
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Crear Producto'}
                </button>
            </form>
        </div>
    );
}

export default CreateProduct; 