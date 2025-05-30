import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './EditProduct.css'; // Asegúrate de crear este archivo CSS

function EditProduct() {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cargar el producto y las categorías al montar el componente
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const [productoResponse, categoriasResponse] = await Promise.all([
                    apiService.getProductoById(id),
                    apiService.getCategorias()
                ]);

                if (productoResponse && productoResponse.data) {
                    const productoData = productoResponse.data;
                    setFormData({
                        nombre: productoData.nombre,
                        descripcion: productoData.descripcion,
                        precio: productoData.precio.toString(), // Convertir a string para input type="number"
                        stock: productoData.stock.toString(),     // Convertir a string para input type="number"
                        imagenUrl: productoData.imagenUrl,
                        categoriaId: productoData.categoriaId.toString() // Convertir a string para el select value
                    });
                    setError(null);
                } else {
                    throw new Error('Producto no encontrado o respuesta inesperada');
                }

                 if (categoriasResponse && categoriasResponse.data) {
                    setCategorias(categoriasResponse.data);
                } else {
                    // Manejar caso sin categorías (opcional)
                    setCategorias([]);
                 }

            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError(err.response?.data?.message || 'Error al cargar los datos del producto');
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [id]); // Dependencia del ID para recargar si cambia

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
            // Asegúrate de que los campos numéricos sean números antes de enviar
            const dataToSend = {
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock, 10),
                categoriaId: parseInt(formData.categoriaId, 10)
            };
            
            await apiService.updateProducto(id, dataToSend);
            alert('Producto actualizado con éxito!');
            navigate(`/productos/${id}`); // Redirige de vuelta a la página de detalles

        } catch (err) {
            console.error('Error al actualizar el producto:', err);
            setError(err.response?.data?.message || 'Error al actualizar el producto');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Cargando producto para editar...</h2>
                <p>Por favor espere...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate(`/productos/${id}`)}>
                    Volver a Detalles
                </button>
            </div>
        );
    }

    return (
        <div className="edit-product-container">
            <h1>Editar Producto</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="edit-product-form">
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
                        step="0.01"
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
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                 <button 
                    type="button" 
                    className="cancel-button"
                     onClick={() => navigate(`/productos/${id}`)}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default EditProduct; 