
import { useCart } from './context/CartContext';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { addCommande } from "./services/ApiCommandes";

const Panier = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  // Calculate shipping (7 DT as shown in the example)
  const shippingFee = 7.00;
  const subtotal = totalPrice;
  const total = subtotal + shippingFee;
const [userEmail, setUserEmail] = useState("");
  const [newCommande, setNewCmd] = useState({
    model: "",
    prix: "",
    matricule: "",
    email: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserEmail(userData.email);
      setNewCmd(prevState => ({
        ...prevState,
        email: userData.email,
        matricule: userData.username || "admin"
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCmd({ ...newCommande, [name]: value });
  };

  const AddNewCommande = async () => {
    try {
      if (!newCommande.model || !newCommande.prix || !newCommande.matricule) {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
      }
      
      await addCommande(newCommande);
      setNewCmd({
        model: "",
        prix: "",
        matricule: newCommande.matricule, // Garde la même valeur pour matricule
        email: userEmail
      });
      alert("Commande ajoutée avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de la commande");
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Explore our collection</h1>
      <h2 style={styles.cartHeader}>My Cart</h2>
      
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Votre panier est vide</p>
          <Link to="/" style={styles.continueShopping}>
            Continuer vos achats
          </Link>
        </div>
      ) : (
        <>
          <div style={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                <div style={styles.cartItemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>{item.price} DT</p>
                  <div style={styles.quantityControls}>
                    <button 
                      style={styles.quantityButton} 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button 
                      style={styles.quantityButton} 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeItem}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.formTitle}>Customer Information</h3>
            <input
          type="text"
          name="model"
          placeholder="nom du produit"
            style={styles.inputField}
          value={newCommande.model}
          onChange={handleChange}
        />
        
        <input
          type="number"
          name="prix"
          placeholder="Prix"
            style={styles.inputField}
          value={newCommande.prix}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="matricule"
          placeholder="Nom du client"
            style={styles.inputField}
          value={newCommande.matricule}
          onChange={handleChange}
        />
        
        
        <input
          type="email"
          name="email"
          placeholder="Email"
            style={styles.inputField}
          value={newCommande.email}
          onChange={handleChange}
          readOnly={!!userEmail}
        />
        
        
          </div>
          
          <div style={styles.summarySection}>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} DT</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>{shippingFee.toFixed(2)} DT</span>
            </div>
            <div style={{...styles.summaryRow, ...styles.totalRow}}>
              <span>Total:</span>
              <span>{total.toFixed(2)} DT</span>
            </div>
            <button
          onClick={AddNewCommande}
          style={styles.buyNowButton}
         
        >
          Ajouter la commande
        </button>
           
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  },
  cartHeader: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px 0',
  },
  continueShopping: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  cartItems: {
    marginBottom: '30px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
    position: 'relative',
  },
  cartItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '20px',
  },
  cartItemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    margin: '0 0 5px 0',
  },
  itemPrice: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 10px 0',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    width: '25px',
    height: '25px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quantity: {
    margin: '0 10px',
  },
  removeItem: {
    position: 'absolute',
    right: '0',
    top: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999',
  },
  formSection: {
    margin: '30px 0',
  },
  formTitle: {
    fontSize: '18px',
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  summarySection: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  totalRow: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '15px 0',
  },
  buyNowButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Panier;