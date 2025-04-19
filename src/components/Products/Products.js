import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import sampleProducts from '../../data/sampleProducts';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const handleAddSample = () => {
        sampleProducts.forEach(product => addToCart(product));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="products-container">
            <h1>Produkty</h1>
            <button onClick={handleAddSample} className="demo-btn">
                Dodaj przykładowe produkty do koszyka
            </button>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Cena: ${product.price}</p>
                        <p>Opis: {product.description}</p>
                        <button 
                            onClick={() => addToCart(product)}
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
