import React from 'react';
import './App.css';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>React E-commerce Store</h1>
            <nav className="app-nav">
              <Link to="/">Produkty</Link>
              <Link to="/cart">Koszyk</Link>
            </nav>
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
