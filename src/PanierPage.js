// PanierPage.js
import React, { useState } from 'react';

const PanierPage = () => {
  // Exemple de données de panier
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Produit 1', price: 899, quantity: 1 },
    { id: 2, name: 'Produit 2', price: 1254, quantity: 1 },
    { id: 3, name: 'Produit 3', price: 300, quantity: 1 }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="panier-page">
      <h1>Votre Panier</h1>
      
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="item-subtotal">
                ${item.price * item.quantity}
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="remove-btn"
              >
                Supprimer
              </button>
            </div>
          ))}
          
          <div className="cart-summary">
            <h2>Total: ${total}</h2>
            <button className="checkout-btn">Passer la commande</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierPage;