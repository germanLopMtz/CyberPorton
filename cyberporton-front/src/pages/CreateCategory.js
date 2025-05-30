import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './CreateCategory.css';

function CreateCategory() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
            await apiService.createCategoria(formData);
            navigate('/categorias');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la categoría');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-category-container">
            <h2>Crear Nueva Categoría</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="create-category-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de la Categoría:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese el nombre de la categoría"
                    />
                </div>
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear Categoría'}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => navigate('/categorias')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCategory; 