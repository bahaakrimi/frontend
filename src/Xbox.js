import React from 'react';
import { useCart } from './context/CartContext';
import { Link } from 'react-router-dom';


const Commande = () => {
  const { cart, totalPrice, clearCart } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer la commande au backend
    alert('Commande passée avec succès !');
    clearCart();
  };

  return (
    <div className="commande-container">
      <h2>Passer la commande</h2>
      
      <div className="commande-summary">
        <h3>Récapitulatif de la commande</h3>
        {cart.map(item => (
          <div key={item.id} className="commande-item">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="commande-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="commande-form">
        <h3>Informations de livraison</h3>
        <input type="text" placeholder="Nom" required />
        <input type="text" placeholder="Prénom" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Adresse" required />
        <input type="text" placeholder="Ville" required />
        <input type="text" placeholder="Code postal" required />
        
        <button type="submit" className="confirm-commande">
          Confirmer la commande
        </button>
      </form>

      <Link to="/panier" className="back-to-cart">
        Retour au panier
      </Link>
    </div>
  );
};

export default Commande;