import React from 'react';
import { useCart } from '../../context/CartContext';
import Payments from '../Payments/Payments';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className="cart-container">
            <h1>Koszyk</h1>
            {cartItems.length === 0 ? (
                <p>Twój koszyk jest pusty.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <span>{item.name} - {item.price} PLN</span>
                                <button onClick={() => removeFromCart(item.id)}>Usuń</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart} className="clear-cart-btn">Wyczyść koszyk</button>
                    <Link to="/">Powrót do produktów</Link>
                    <Payments />
                </>
            )}
        </div>
    );
};

export default Cart;
