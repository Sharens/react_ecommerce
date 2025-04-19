import React from 'react';
import { useCart } from '../../context/CartContext';
import sampleProducts from '../../data/sampleProducts';

const Products = () => {
    const { addToCart } = useCart();

    return (
        <div className="products-container">
            <h1>Produkty</h1>
            <div className="products-grid">
                {sampleProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Cena: {product.price} PLN</p>
                        <p>
                            {product.available
                                ? 'Dostępny'
                                : 'Brak w magazynie'}
                        </p>
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
