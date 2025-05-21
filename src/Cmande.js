import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const Commande = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        model: '',
        prix: '',
        matricula: '',
        tel: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [factureData, setFactureData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateFacture = (commandeData) => {
        const factureContent = `
            ==============================
            FACTURE - COMMANDE ${commandeData.reference}
            ==============================
            
            Date: ${new Date().toLocaleDateString()}
            
            DÉTAILS DE LA COMMANDE:
            -------------------------------
            Modèle: ${formData.model}
            Prix: ${formData.prix} DH
            Référence: ${formData.matricula}
            
            INFORMATIONS CLIENT:
            -------------------------------
            Email: ${formData.email}
            Téléphone: ${formData.tel}
            
            Statut: En attente de traitement
            
            Merci pour votre commande!
        `;

        const blob = new Blob([factureContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `facture_${commandeData.reference}.txt`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!formData.email.includes('@')) {
                throw new Error('Veuillez entrer un email valide');
            }

            const response = await axios.post('http://localhost:5000/commande/add', formData);
            
            if (response.data.success) {
                setSuccess(true);
                setFactureData(response.data);
                generateFacture(response.data);
                
                setTimeout(() => {
                    setFormData({
                        model: '',
                        prix: '',
                        matricula: '',
                        tel: '',
                        email: ''
                    });
                    setSuccess(false);
                }, 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#333'
            }}>Passer une commande</h1>
            
            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#dc2626',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}
            
            {success && factureData && (
                <div style={{
                    backgroundColor: '#dcfce7',
                    border: '1px solid #86efac',
                    color: '#166534',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    <p>Commande enregistrée avec succès!</p>
                    <p>Référence: {factureData.reference}</p>
                    <p>Votre facture a été téléchargée automatiquement.</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label htmlFor="model" style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Modèle:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ex: PlayStation 5"
                    />
                </div>
                
                <div>
                    <label htmlFor="prix" style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Prix (DH):</label>
                    <input
                        type="number"
                        id="prix"
                        name="prix"
                        value={formData.prix}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ex: 4999"
                    />
                </div>
                
                <div>
                    <label htmlFor="matricula" style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Matricule/Référence:</label>
                    <input
                        type="text"
                        id="matricula"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ex: CMD-2024-001"
                    />
                </div>
                
                <div>
                    <label htmlFor="email" style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ex: client@example.com"
                    />
                </div>
                
                <div>
                    <label htmlFor="tel" style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Téléphone:</label>
                    <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ex: 0612345678"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        backgroundColor: loading ? '#93c5fd' : '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s',
                        marginTop: '1rem'
                    }}
                >
                    {loading ? 'Envoi en cours...' : 'Envoyer et générer la facture'}
                </button>
            </form>
        </div>
    );
};

export default Commande;