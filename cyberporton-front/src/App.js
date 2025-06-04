import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Páginas
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import CreateProduct from './pages/CreateProduct';
import CreateCategory from './pages/CreateCategory';
import EditProduct from './pages/EditProduct';
import Perfil from './pages/Perfil';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryList from './components/CategoryList';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content-with-sidebar">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias" element={<CategoryList />} />
                <Route path="/categorias/crear" element={<CreateCategory />} />
                <Route path="/productos" element={<ProductList />} />
                <Route path="/productos/categoria/:categoriaId" element={<ProductList />} />
                <Route path="/productos/:id" element={<ProductDetail />} />
                <Route path="/productos/crear" element={<CreateProduct />} />
                <Route path="/productos/editar/:id" element={<EditProduct />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/pedidos" element={<Orders />} />
                <Route path="/pedidos/:id" element={<OrderDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/perfil" element={<Perfil />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
