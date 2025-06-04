import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../redux/slices/userSlice';
import './Perfil.css';

const API_URL = 'http://localhost:5018/api';

const Perfil = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombreCompleto: user?.nombreCompleto || '',
    correoElectronico: user?.correoElectronico || '',
    direccion: user?.direccion || '',
    telefono: user?.telefono || '',
    contrasena: '' // <-- Nuevo campo
  });
  const [mensaje, setMensaje] = useState('');

  if (!user) {
    return (
      <div className="main-container">
        <h2>No hay datos de usuario. Inicia sesión para ver tu perfil.</h2>
        <Link to="/login" className="main-btn">Iniciar Sesión</Link>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditando(true);

  const handleCancel = () => {
    setEditando(false);
    setForm({
      nombreCompleto: user.nombreCompleto,
      correoElectronico: user.correoElectronico,
      direccion: user.direccion,
      telefono: user.telefono
    });
    setMensaje('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const response = await axios.put(
        `${API_URL}/Usuarios/${user.id}`, // <-- Aquí revisa que API_URL y user.id sean correctos
        {
          nombreCompleto: form.nombreCompleto,
          correoElectronico: form.correoElectronico,
          direccion: form.direccion,
          telefono: form.telefono,
          contrasena: form.contrasena // <-- Este campo es obligatorio para tu backend
        }
      );
      const updatedUser = response.data;
      dispatch({ type: 'user/login/fulfilled', payload: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditando(false);
      setMensaje('¡Perfil actualizado correctamente!');
    } catch (error) {
      const backendMsg = error.response?.data?.message || error.response?.data || error.message;
      setMensaje(`Error al actualizar el perfil: ${backendMsg}`);
      console.error('Error al actualizar perfil:', error.response || error);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Mi Perfil</h1>
      <div className="perfil-card">
        {mensaje && <div className="mensaje-actualizacion">{mensaje}</div>}
        {!editando ? (
          <>
            <div className="perfil-datos">
              <div><strong>Nombre:</strong> {user.nombreCompleto}</div>
              <div><strong>Correo electrónico:</strong> {user.correoElectronico}</div>
              <div><strong>Dirección:</strong> {user.direccion}</div>
              <div><strong>Teléfono:</strong> {user.telefono}</div>
            </div>
            <div className="perfil-actions">
              <Link to="/pedidos" className="main-btn">Ver mis pedidos</Link>
              <button onClick={handleEdit} className="main-btn">Editar perfil</button>
              <button onClick={handleLogout} className="main-btn logout">Cerrar sesión</button>
            </div>
          </>
        ) : (
          <form className="perfil-form" onSubmit={handleSave}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo electrónico:
              <input
                type="email"
                name="correoElectronico"
                value={form.correoElectronico}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
              />
            </label>
            <label>
              Teléfono:
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="contrasena"
                value={form.contrasena}
                onChange={handleChange}
                required
                placeholder="Ingresa tu contraseña actual o nueva"
              />
            </label>
            <div className="perfil-actions">
              <button type="submit" className="main-btn">Guardar</button>
              <button type="button" onClick={handleCancel} className="main-btn logout">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Perfil;