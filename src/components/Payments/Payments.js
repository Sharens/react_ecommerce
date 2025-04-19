import React, { useState } from 'react';
import api from '../../api';
import { useCart } from '../../context/CartContext';

const Payments = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [loading, setLoading] = useState(false);
    const { cartItems, clearCart } = useCart();

    const handlePayment = async () => {
        if (!cartItems.length) {
            alert('Twój koszyk jest pusty!');
            return;
        }

        if (!paymentMethod || !cardNumber || !cardExpiry || !cardCVC) {
            alert('Proszę wypełnić wszystkie dane płatności');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/payments', {
                paymentMethod,
                cardNumber,
                cardExpiry,
                cardCVC,
                items: cartItems
            });

            if (response.data.success) {
                alert('Płatność zakończona sukcesem!');
                clearCart(); // Czyszczenie koszyka po udanej płatności
            } else {
                alert('Płatność nie powiodła się: ' + response.data.message);
            }
        } catch (error) {
            console.error('Błąd płatności:', error);
            alert('Płatność nie powiodła się. Proszę spróbować ponownie.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payments-container">
            <h2>Informacje o płatności</h2>
            <div className="payment-form">
                <div className="form-group">
                    <label>Metoda płatności:</label>
                    <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Wybierz metodę płatności</option>
                        <option value="credit_card">Karta kredytowa</option>
                        <option value="debit_card">Karta debetowa</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Numer karty:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Data ważności:</label>
                    <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/RR"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>CVC:</label>
                    <input
                        type="text"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        placeholder="123"
                        required
                    />
                </div>

                <div className="cart-summary">
                    <h3>Podsumowanie koszyka</h3>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <span>{item.name}</span>
                            <span>{item.price} PLN</span>
                        </div>
                    ))}
                    <div className="total">
                        <span>Suma:</span>
                        <span>{cartItems.reduce((sum, item) => sum + item.price, 0)} PLN</span>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className="pay-btn"
                >
                    {loading ? 'Przetwarzanie...' : 'Zapłać'}
                </button>
            </div>
        </div>
    );
};

export default Payments;
