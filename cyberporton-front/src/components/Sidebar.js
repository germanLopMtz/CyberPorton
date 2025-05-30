import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const location = useLocation();
    const [contraido, setContraido] = useState(false);

    const handleToggle = () => setContraido(!contraido);

    return (
        <aside className={`sidebar${contraido ? ' contraido' : ''}`}>
            <button className="sidebar-toggle" onClick={handleToggle} title={contraido ? 'Expandir' : 'Contraer'}>
                {contraido ? '»' : '«'}
            </button>
            <nav>
                <ul>
                    <li className="sidebar-section">
                        <span className="sidebar-title">Productos</span>
                        <ul>
                            <li className={location.pathname === '/productos' ? 'active' : ''}>
                                <Link to="/productos">Listar</Link>
                            </li>
                            <li className={location.pathname === '/productos/crear' ? 'active' : ''}>
                                <Link to="/productos/crear">Crear</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-section">
                        <span className="sidebar-title">Categorías</span>
                        <ul>
                            <li className={location.pathname === '/categorias' ? 'active' : ''}>
                                <Link to="/categorias">Listar</Link>
                            </li>
                            <li className={location.pathname === '/categorias/crear' ? 'active' : ''}>
                                <Link to="/categorias/crear">Crear</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar; 