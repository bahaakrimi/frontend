import React from 'react';
import { useCart } from './context/CartContext';
import { Link } from 'react-router-dom';
import './Panier.css';

const Panier = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  return (
    <div className="panier-container">
      <h2>Votre Panier ({totalItems} articles)</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide</p>
          <Link to="/" className="continue-shopping">
            Continuer vos achats
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="total-price">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart">
                Vider le panier
              </button>
              <Link to="/Xbox" className="checkout">
                Passer la commande
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;