import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';

function Panier() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Votre panier</h2>
      {cart.length === 0 ? (
        <p>Le panier est vide</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <p>{item.name} - {item.price} Dhs</p>
            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Panier;
