import React from 'react';
import './App.css';
import Products from './components/Products/Products';
import Payments from './components/Payments/Payments';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>React E-commerce Store</h1>
        </header>
        <main className="main-content">
          <Products />
          <Payments />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
