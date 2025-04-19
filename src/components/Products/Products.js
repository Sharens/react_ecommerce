import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import api from '../../api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error fetching products:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Ładowanie produktów...</div>;
    }

    return (
        <div className="products-container">
            <h1>Produkty</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Cena: {product.price} PLN</p>
                        <p>{product.available ? 'Dostępny' : 'Brak w magazynie'}</p>
                        <p>Opis: {product.description}</p>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={!product.available}
                            className="add-to-cart-btn"
                        >
                            Dodaj do koszyka
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
