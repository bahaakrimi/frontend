
import { useCart } from './context/CartContext';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Panier = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  const shippingFee = 7.00;
  const subtotal = totalPrice;
  const total = subtotal + shippingFee;
  
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    tel: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const prepareCommandeData = () => {
    // Modification ici: inclure l'adresse dans le modèle
    const modelWithAddress = `CMD-${Date.now()}-${formData.address.replace(/\s+/g, '_')}`;
    
    return {
      model: formData.address, // Utilisation du nouveau modèle avec adresse
      username: userData?.username || "Client",
      owner: userData?._id || null,
      products: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        productName: item.name,
        price: item.price
      })),
      tel: formData.tel,
      email: userData?.email || "",
      status: "en_attente",
      subtotal: subtotal.toFixed(2),
      shipping: shippingFee.toFixed(2),
      total: total.toFixed(2),
      date: new Date().toLocaleString()
    };
  };

  const generateInvoice = (commandeData) => {
    const doc = new jsPDF();
    
    // Logo et en-tête
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('FACTURE', 105, 20, { align: 'center' });
    
    // Informations de la facture
    doc.setFontSize(10);
    doc.text(`N°: ${commandeData.model.split('-').slice(0, 2).join('-')}`, 14, 30); // Afficher seulement CMD-timestamp
    doc.text(`Date: ${commandeData.date}`, 14, 35);
    
    // Informations du magasin
    doc.setFontSize(12);
    doc.text('E-COMMERCE STORE', 14, 45);
    doc.text('123 Rue du Commerce', 14, 50);
    doc.text('Tunis, Tunisie', 14, 55);
    doc.text('Tél: +216 12 345 678', 14, 60);
    
    // Informations client
    doc.setFontSize(14);
    doc.text('CLIENT:', 14, 75);
    doc.setFontSize(12);
    doc.text(`Nom: ${commandeData.username}`, 14, 80);
    doc.text(`Email: ${commandeData.email}`, 14, 85);
    doc.text(`Téléphone: ${commandeData.tel}`, 14, 90);
    // Extraire l'adresse du modèle
    const addressFromModel = commandeData.model.split('-').slice(2).join(' ').replace(/_/g, ' ');
    doc.text(`Adresse: ${addressFromModel}`, 14, 95);
    
    // Tableau des produits
    const productsTable = commandeData.products.map(item => [
      item.productName,
      item.quantity,
      `${item.price} DT`,
      `${(item.price * item.quantity).toFixed(2)} DT`
    ]);
    
    autoTable(doc, {
      startY: 110,
      head: [['Produit', 'Quantité', 'Prix unitaire', 'Total']],
      body: productsTable,
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255]
      },
      styles: {
        cellPadding: 5,
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 }
      }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Sous-total: ${commandeData.subtotal} DT`, 140, finalY);
    doc.text(`Frais de livraison: ${commandeData.shipping} DT`, 140, finalY + 5);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`TOTAL: ${commandeData.total} DT`, 140, finalY + 15);
    
    // Conditions de paiement
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Conditions de paiement: Paiement à la livraison', 14, finalY + 30);
    doc.text('Merci pour votre confiance !', 105, finalY + 40, { align: 'center' });
    
    return doc;
  };

  const handlePreviewInvoice = () => {
    if (!formData.tel) {
      setError("Le numéro de téléphone est obligatoire");
      return;
    }
    
    if (!formData.address) {
      setError("L'adresse de livraison est obligatoire");
      return;
    }
    
    if (cart.length === 0) {
      setError("Votre panier est vide");
      return;
    }
    
    const data = prepareCommandeData();
    setInvoiceData(data);
    setShowInvoicePreview(true);
    setError(null);
  };

  const handleDownloadInvoice = () => {
    const invoice = generateInvoice(invoiceData);
    invoice.save(`Facture_${invoiceData.model.split('-').slice(0, 2).join('-')}.pdf`);
    setShowInvoicePreview(false);
  };

  const handleSubmitCommande = async () => {
    setError(null);
    setSuccess(false);

    if (!formData.tel) {
      setError("Le numéro de téléphone est obligatoire");
      return;
    }

    if (!formData.address) {
      setError("L'adresse de livraison est obligatoire");
      return;
    }

    if (cart.length === 0) {
      setError("Votre panier est vide");
      return;
    }

    setLoading(true);

    try {
      const commandeData = prepareCommandeData();
      
      const response = await axios.post(
        'http://localhost:5000/commande/add', 
        commandeData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data && (response.data.message === "Commande ajoutée avec succès" || response.data._id)) {
        const invoice = generateInvoice(commandeData);
        invoice.save(`Facture_${commandeData.model.split('-').slice(0, 2).join('-')}.pdf`);
        
        clearCart();
        setSuccess(true);
        setFormData({ tel: "", address: "" });
      } else {
        throw new Error(response.data.message || "Erreur inconnue du serveur");
      }
    } catch (err) {
      console.error("Erreur API:", err);
      setError(err.response?.data?.message || err.message || "Erreur lors de l'ajout de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Mon Panier</h1>
      
      {error && <div style={styles.error}>{error}</div>}
      {success && (
        <div style={styles.success}>
          Commande passée avec succès ! Votre facture a été téléchargée.
          <Link to="/" style={styles.continueShopping}>
            Retour à l'accueil
          </Link>
        </div>
      )}

      {cart.length === 0 && !success ? (
        <div style={styles.emptyCart}>
          <p>Votre panier est vide</p>
          <Link to="/" style={styles.continueShopping}>
            Continuer vos achats
          </Link>
        </div>
      ) : (
        !success && (
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
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span style={styles.itemQuantity}>{item.quantity}</span>
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
              <h3 style={styles.formTitle}>Informations client</h3>
              
              <input
                type="tel"
                name="tel"
                placeholder="Numéro de téléphone *"
                style={styles.inputField}
                value={formData.tel}
                onChange={handleChange}
                required
              />
              
              <input
                type="text"
                name="address"
                placeholder="Adresse de livraison *"
                style={styles.inputField}
                value={formData.address}
                onChange={handleChange}
                required
              />
              
              {userData?.email && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={styles.inputField}
                  value={userData.email}
                  readOnly
                />
              )}
            </div>
            
            <div style={styles.summarySection}>
              <div style={styles.summaryRow}>
                <span>Articles:</span>
                <span>{totalItems}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} DT</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Frais de livraison:</span>
                <span>{shippingFee.toFixed(2)} DT</span>
              </div>
              <div style={{...styles.summaryRow, ...styles.totalRow}}>
                <span>Total:</span>
                <span>{total.toFixed(2)} DT</span>
              </div>
              
              <button
                onClick={handlePreviewInvoice}
                style={styles.previewButton}
                disabled={loading || cart.length === 0}
              >
                Prévisualiser la facture
              </button>
              
              <button
                onClick={handleSubmitCommande}
                style={styles.buyNowButton}
                disabled={loading || cart.length === 0}
              >
                {loading ? "Traitement en cours..." : "Valider la commande"}
              </button>
            </div>
          </>
        )
      )}

      {showInvoicePreview && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Prévisualisation de la facture</h3>
            
            <div style={styles.invoicePreview}>
              <div style={styles.invoiceRow}>
                <span style={styles.invoiceLabel}>Numéro de facture:</span>
                <span>{invoiceData.model.split('-').slice(0, 2).join('-')}</span>
              </div>
              <div style={styles.invoiceRow}>
                <span style={styles.invoiceLabel}>Date:</span>
                <span>{invoiceData.date}</span>
              </div>
              <div style={styles.invoiceRow}>
                <span style={styles.invoiceLabel}>Client:</span>
                <span>{invoiceData.username}</span>
              </div>
              <div style={styles.invoiceRow}>
                <span style={styles.invoiceLabel}>Adresse:</span>
                <span>{invoiceData.model.split('-').slice(2).join(' ').replace(/_/g, ' ')}</span>
              </div>
              
              <div style={styles.productsHeader}>
                <span>Produit</span>
                <span>Quantité</span>
                <span>Prix</span>
                <span>Total</span>
              </div>
              
              {invoiceData.products.map((item, index) => (
                <div key={index} style={styles.productRow}>
                  <span>{item.productName}</span>
                  <span>{item.quantity}</span>
                  <span>{item.price} DT</span>
                  <span>{(item.price * item.quantity).toFixed(2)} DT</span>
                </div>
              ))}
              
              <div style={styles.invoiceTotal}>
                <div style={styles.invoiceRow}>
                  <span style={styles.invoiceLabel}>Sous-total:</span>
                  <span>{invoiceData.subtotal} DT</span>
                </div>
                <div style={styles.invoiceRow}>
                  <span style={styles.invoiceLabel}>Frais de livraison:</span>
                  <span>{invoiceData.shipping} DT</span>
                </div>
                <div style={{...styles.invoiceRow, ...styles.grandTotal}}>
                  <span style={styles.invoiceLabel}>Total:</span>
                  <span>{invoiceData.total} DT</span>
                </div>
              </div>
            </div>
            
            <div style={styles.modalButtons}>
              <button 
                onClick={() => setShowInvoicePreview(false)}
                style={styles.cancelButton}
              >
                Annuler
              </button>
              <button 
                onClick={handleDownloadInvoice}
                style={styles.downloadButton}
              >
                Télécharger la facture
              </button>
            </div>
          </div>
        </div>
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
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#333'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#666'
  },
  continueShopping: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.3s'
  },
  cartItems: {
    marginBottom: '30px',
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
    position: 'relative',
    backgroundColor: '#fff'
  },
  cartItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '20px',
    borderRadius: '4px'
  },
  cartItemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    margin: '0 0 5px 0',
    color: '#333'
  },
  itemPrice: {
    fontSize: '14px',
    color: '#e74c3c',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
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
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    margin: '0 10px',
    minWidth: '20px',
    textAlign: 'center'
  },
  removeItem: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#95a5a6',
    padding: '0 10px'
  },
  formSection: {
    margin: '30px 0',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  },
  formTitle: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#2c3e50'
  },
  inputField: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '14px'
  },
  summarySection: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#555'
  },
  totalRow: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '15px 0',
    color: '#2c3e50'
  },
  previewButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s'
  },
  buyNowButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  error: {
    color: '#e74c3c',
    marginBottom: '15px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
    border: '1px solid #f5b7b1'
  },
  success: {
    color: '#27ae60',
    marginBottom: '15px',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#d5f5e3',
    borderRadius: '4px',
    border: '1px solid #a3e4d7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  modalTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center'
  },
  invoicePreview: {
    border: '1px solid #eee',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '20px'
  },
  invoiceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px'
  },
  invoiceLabel: {
    fontWeight: 'bold',
    color: '#555'
  },
  productsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    margin: '15px 0 10px 0'
  },
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f5f5f5'
  },
  invoiceTotal: {
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '2px solid #eee'
  },
  grandTotal: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: '10px'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  cancelButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  downloadButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  confirmButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Panier;