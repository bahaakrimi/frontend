import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const AjoutCommande = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    model: '',
    prix: '',
    produits: [],
    matricula: '',
    tel: '',
    email: '',
    owner: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const product = location.state;

    setFormData({
      model: product?.productName || '',
      prix: product?.productPrice || '',
      produits: product?.productId ? [product.productId] : [],
      matricula: user?.username || '',
      tel: user?.age?.toString() || '',
      email: user?.email || '',
      owner: user?._id || ''
    });
  }, [location.state]);

  const generateFacturePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Facture de Commande', 105, 20, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);
    
    doc.setFontSize(12);
    doc.text(`Référence: CMD-${Date.now()}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    
    doc.setFontSize(14);
    doc.text('Détails de la commande:', 20, 60);
    doc.setFontSize(12);
    doc.text(`Modèle: ${formData.model}`, 20, 70);
    doc.text(`Prix: ${formData.prix} TND`, 20, 80);
    doc.text(`Référence produit: ${formData.matricula}`, 20, 90);
    
    doc.setFontSize(14);
    doc.text('Informations client:', 20, 110);
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email}`, 20, 120);
    doc.text(`Téléphone: ${formData.tel}`, 20, 130);
    
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text('Statut: En attente de traitement', 20, 150);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Colis sera livré dans les 48 heures', 105, 180, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Merci pour votre commande!', 105, 190, { align: 'center' });
    
    doc.save(`facture_${Date.now()}.pdf`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.prix || isNaN(formData.prix)) {
      setMessage("Veuillez entrer un prix valide");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:5000/commande/add', {
        ...formData,
        prix: Number(formData.prix)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
      generateFacturePDF();
      setTimeout(() => navigate('/commandes'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  // Styles CSS
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px'
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px'
    },
    inputReadOnly: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      color: '#666'
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      marginTop: '10px'
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    divider: {
      borderTop: '1px solid #eee',
      margin: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Nouvelle Commande</h2>
      
      {message && (
        <div style={{ 
          ...styles.message,
          color: message.includes('succès') ? 'green' : 'red',
          backgroundColor: message.includes('succès') ? '#e6ffe6' : '#ffe6e6'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Modèle du produit:</label>
          <input
            type="text"
            value={formData.model}
            readOnly
            style={styles.inputReadOnly}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Prix (TND):</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Matricule:</label>
          <input
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Téléphone:</label>
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <input type="hidden" name="owner" value={formData.owner} />
        <input type="hidden" name="produits" value={formData.produits} />

        <div style={styles.divider}></div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'En cours...' : 'Ajouter la commande'}
        </button>
      </form>
    </div>
  );
};

export default AjoutCommande;