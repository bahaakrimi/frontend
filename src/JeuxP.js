import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommentairePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProductWithComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/produit/getProduitById/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des commentaires');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProductWithComments();
    }, [id]);

    const handleImageError = (e) => {
        e.target.src = 'http://localhost:5000/files/default-product.png';
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Chargement...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '20px' }}>Produit non trouvé</div>;

    return (
        <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <Link to="/App"><button 
                onClick={() => navigate(-1)}
                style={{ 
                    background: 'none',
                    border: 'none',
                    color: '#3498db',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    fontSize: '1rem'
                }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    style={{marginRight: '5px'}}
                >
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Retour aux Home
            </button></Link>
            
            <h1 style={{ 
                color: '#2c3e50',
                borderBottom: '1px solid #ecf0f1',
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                Commentaires pour {product.name}
            </h1>
            
            <div style={{ 
                marginBottom: '30px',
                padding: '20px',
                border: '1px solid #ecf0f1',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{
                    width: '150px',
                    height: '150px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <img 
                        src={`http://localhost:5000/files/${product.image}`} 
                        alt={product.name}
                        style={{ 
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                        onError={handleImageError}
                    />
                </div>
                
                <div>
                    <h3 style={{ 
                        marginTop: '0',
                        marginBottom: '10px',
                        color: '#2c3e50'
                    }}>
                        {product.name}
                    </h3>
                    
                    
                    
                </div>
            </div>
            
            <div>
                <h2 style={{ 
                    color: '#2c3e50',
                    borderBottom: '1px solid #ecf0f1',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    Avis des clients ({product.feedbacks.length})
                </h2>
                
                {product.feedbacks.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '30px',
                        border: '1px dashed #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="50" 
                            height="50" 
                            fill="#bdc3c7" 
                            viewBox="0 0 16 16"
                            style={{marginBottom: '15px'}}
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>
                        <p style={{ 
                            color: '#95a5a6',
                            fontSize: '1.1rem',
                            margin: 0
                        }}>
                            Aucun commentaire pour ce produit
                        </p>
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        {product.feedbacks.map((feedback, index) => (
                            <div 
                                key={index}
                                style={{ 
                                    padding: '20px',
                                    marginBottom: '20px',
                                    border: '1px solid #ecf0f1',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i}
                                                style={{
                                                    color: i < feedback.rating ? '#f1c40f' : '#bdc3c7',
                                                    fontSize: '20px',
                                                    marginRight: '2px'
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span style={{ 
                                        color: '#95a5a6',
                                        fontSize: '0.9rem'
                                    }}>
                                        {new Date(feedback.createdAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <p style={{ 
                                    margin: '0',
                                    color: '#34495e',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {feedback.comment || "Aucun commentaire écrit"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentairePage;