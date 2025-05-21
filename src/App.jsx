import logo from './logo.svg';
import './App.css';
import Electronic from './Electronic'
import Fashion from './Fashion'
import Jewellery from './Jewellery'
import PayPage from './PayPage'
import CreationUser from './CreationUser'
import LoginForm from './LoginForm'
import Sports from './Sports'
import Jeux from './Jeux'
import Cmande   from './Cmande'
import axios from 'axios';
import './Jeux.css';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

import { CartContext } from './context/CartContext';
import Panier from './Panier'
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';



import { FaAngleDown } from 'react-icons/fa';



function App() {
    const { totalItems } = useCart(); // Ajoutez cette ligne
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
      const [products, setProducts] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [searchError, setSearchError] = useState(null);
    
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleSubmitFeedback = async (productId) => {
    if (rating < 1 || rating > 5) {
      setError('Veuillez sélectionner une note entre 1 et 5');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/produit/addFeedback/${productId}`,
        { rating, comment },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage(response.data.message);
      setRating(0);
      setComment('');
      setCurrentProductId(null); // Fermer le formulaire après soumission
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur serveur');
    } finally {
      setIsSubmitting(false);
    }
  };



  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await axios.get('http://localhost:5000/produit/filter', { params });
      setProducts(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

      

    const navigate = useNavigate();
    
    const handleBuyNowClick = () => {
        // Redirection vers la page de paiement
        navigate('/cmande');
    };
    
    const goToCreationUser = () => {
        navigate('/LoginForm');
    };
    
    const [showFashionDropdown, setShowFashionDropdown] = useState(false);
      const productsq = [
    {
      id: 1,
      name: "Man T-shirt",
      price: 30,
      image: "https://via.placeholder.com/200x250?text=Man+T-shirt" // Remplacez par votre image
    },
    {
      id: 2,
      name: "Man-shirt",
      price: 30,
      image: "https://via.placeholder.com/200x250?text=Man+Shirt" // Remplacez par votre image
    },
    {
      id: 3,
      name: "Woman Scarf",
      price: 30,
      image: "https://via.placeholder.com/200x250?text=Woman+Scarf" // Remplacez par votre image
    }
  ];

    // Gère l'ouverture/fermeture du menu déroulant
    const toggleFashionDropdown = (e) => {
      e.preventDefault(); // Empêche la navigation immédiate
      setShowFashionDropdown(!showFashionDropdown);
    };
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    

    
    

    useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produit/with-images');
        setProduits(response.data); // On garde tous les produits sans filtre
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
    const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchError('Veuillez entrer un terme de recherche');
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setProducts([]);

    try {
      const response = await fetch(
        `http://localhost:5000/produit/searchProduitByName?name=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) throw new Error('Erreur de recherche');

      const data = await response.json();
      setProducts(data.produits || []);

      if (!data.produits?.length) {
        setSearchError('Aucun produit trouvé');
      }
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const styles = {
    banner: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      fontFamily: 'Arial, sans-serif',
      margin: '20px 0',
      borderRadius: '8px',
    },
    title: {
      margin: '0 0 15px 0',
      color: '#333',
      fontSize: '24px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
    iconsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '25px',
    },
    icon: {
      fontSize: '32px',
      color: '#555',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    iconHover: {
      color: '#000',
    },
  };

  


  
    
  return (
    
   
    <><CartProvider>
    <div class="banner_bg_main">
      <div class="container">
        <div class="header_section_top">
          <div class="row">
            <div class="col-sm-12">
              <div class="custom_menu">
              <nav>
        <ul className="main-nav">
          <li><Link to="/app">HOME</Link></li>
          <li><Link to="/Electronic">Electronic</Link></li>
          <li 
            className="fashion-item"
            onMouseEnter={() => setShowFashionDropdown(true)}
            onMouseLeave={() => setShowFashionDropdown(false)}
          >
            <Link to="/Fashion">Fashion</Link>
            {showFashionDropdown && (
              <ul className="fashion-dropdown">
                <li><Link to="/Jewellery">Fashion Men</Link></li>
                <li><Link to="/Sports">Fashion Women</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Jewellery">Jewellery</Link></li>
          <li><Link to="/Sports">Sports</Link></li>
          <li><Link to="/Jeux">Jeux</Link></li>
          <li><Link to="/JeuxP">meilleur produit</Link></li>
        </ul>
      </nav>
             
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="logo_section">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="logo"><a href="index.html"><img src="./assets/images/logo.png" /></a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="header_section">

        <div style={{ 
  backgroundColor: '#FFD700', 
  padding: '20px', 
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}}>
  <h2 style={{
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '18px',
    fontWeight: '600'
  }}>Filtrer par prix</h2>
  
  <form onSubmit={handleFilter} style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <label style={{
        fontSize: '14px',
        color: '#555',
        fontWeight: '500'
      }}>Prix minimum (TND):</label>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
        min="0"
        placeholder="0"
      />
    </div>
    
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <label style={{
        fontSize: '14px',
        color: '#555',
        fontWeight: '500'
      }}>Prix maximum (TND):</label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
        min="0"
        placeholder="0"
      />
    </div>
    
    <button 
      type="submit" 
      style={{
        padding: '10px 15px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#555'
        },
        ':disabled': {
          backgroundColor: '#999',
          cursor: 'not-allowed'
        }
      }}
      disabled={loading}
    >
      {loading ? 'Filtrage...' : 'Filtrer'}
    </button>
  </form>
</div>
        <div class="container">
          <div class="containt_main">
            <div id="mySidenav" class="sidenav">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <a href="index.html">Home</a>
              <a href="Electronic">Electronics</a>
              
            </div>
            
            <div class="dropdown">
              
              
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
            <div class="main">
                  <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Rechercher un produit..."
  style={{ 
    padding: '12px 20px',
    width: '600px',
    borderRadius: '24px',
    border: '1px solid #dfe1e5',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    outline: 'none'
  }}
  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
/>
        <button 
          onClick={handleSearch} 
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <i class="fa fa-search"></i>
          
        </button>
      </div>

                </div>
            <div class="header_box">
              <div className="lang-box" >
      <div className="language-display" style={{backgroundColor: '#f8f8f8', borderRadius: '8px', padding: '10px' }}>
        <img 
          src="./assets/images/flag-uk.png" 
          alt="UK flag" 
          className="language-flag"
        />
        <span>English</span>
        <FaAngleDown className="dropdown-icon" />
      </div>
    </div>
              <div class="login_menu">
                <ul>
                  <Link to="/Panier">
                       <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span className="padding_10">Panier</span>
                        {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                         )}
                   </Link>
                  <li><a href="#">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <button onClick={goToCreationUser} >LOGIN</button></a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner_section layout_padding">
        <div class="container">
          <div id="my_slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-sm-12">
                    <h1 class="banner_taital">Get Start <br></br>Your favriot shoping</h1>
                    <div class="buynow_bt"><a href="buy.js">Buy Now</a></div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-sm-12">
                    <h1 class="banner_taital">Get Start <br></br>Your favriot shoping</h1>
                    <div class="buynow_bt"><a href="buy">Buy Now</a></div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-sm-12">
                    <h1 class="banner_taital">Get Start <br></br>Your favriot shoping</h1>
                    <div class="buynow_bt"><Link to="/Electronic">buy Now</Link></div>
                  </div>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
              <i class="fa fa-angle-left"></i>
            </a>
            <a class="carousel-control-next" href="#my_slider" role="button" data-slide="next">
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      </div>
      
      



      <div className="fashion-section">
        
       {error && <p style={styles.error}>{error}</p>}
{searchError && (
    <p style={{ color: 'red', marginBottom: '25px', textAlign: 'center', fontSize: '1.1rem' }}>{searchError}</p>
)}

<div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    padding: '25px'
}}>
    {products.map(product => (
        <div key={product._id} style={{ 
            padding: '20px',
            border: '2px solid #3498db',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: '#f8fbfe',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'relative'
        }}>
            {/* Badge de promotion */}
            {product.promotionprice && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                }}>EN PROMOTION</div>
            )}
            
            {/* En-tête renforcé */}
            <div style={{ 
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: '1.4'
            }}>
                <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color: '#2c3e50'
                }}>
                    {product.name}
                </h3>
                
                <div style={{ 
                    margin: 0,
                    fontSize: '1.3rem',
                    color: '#e74c3c',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px'
                }}>
                    {product.promotionprice ? (
                        <>
                            <span style={{ 
                                textDecoration: 'line-through',
                                color: '#95a5a6',
                                marginRight: '10px',
                                fontSize: '1rem'
                            }}>
                                {product.price} TND
                            </span>
                            {product.promotionprice} TND
                        </>
                    ) : (
                        <span>{product.price} TND</span>
                    )}
                   


                </div>
            </div>

            {/* Image agrandie */}
            <div style={{ 
                flexGrow: 1, 
                marginBottom: '20px',
                border: '1px solid #ecf0f1',
                borderRadius: '8px',
                padding: '10px'
            }}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    style={{ 
                        width: '100%',
                        height: '220px',
                        objectFit: 'contain',
                        margin: '0 auto',
                        display: 'block'
                    }}
                    onError={(e) => {
                        e.target.src = 'http://localhost:5000/files/default-product.png';
                    }}
                />
            </div>
            
            {/* Information sur le stock */}
            <p style={{ 
                margin: '0 0 15px 0',
                textAlign: 'center',
                color: '#7f8c8d',
                fontSize: '0.9rem'
            }}>
                Disponible: {product.nbrproduit} unités
            </p>

            {/* Boutons */}
            <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>



              {/* Formulaire de feedback */}
          <div className="feedback-form">
            <h3>Leave Your Feedback</h3>
            
            {message && currentProductId === product._id && (
              <div className="alert alert-success">{message}</div>
            )}
            {error && currentProductId === product._id && (
              <div className="alert alert-danger">{error}</div>
            )}

            <div className="rating-stars mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                >
                  {star <= rating ? '★' : '☆'}
                </span>
              ))}
              <span className="ms-2">{rating}/5</span>
            </div>

            {currentProductId === product._id && (
              <>
                <textarea
                  className="form-control mb-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Votre commentaire..."
                  rows="2"
                />
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubmitFeedback(product._id)}
                    disabled={isSubmitting || rating === 0}
                  >
                    {isSubmitting ? 'Envoi...' : 'Submit Feedback'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCurrentProductId(null);
                      setRating(0);
                      setComment('');
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}

            {currentProductId !== product._id && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentProductId(product._id)}
              >
                Donner votre avis
              </button>
            )}
          </div>
                 <button 
  onClick={() => navigate('/Cmande', { 
    state: { 
      productName: product.name, 
      
    }
  })}
>
  Ajouter une commande
</button>
                
                <button 
        
          onClick={() => addToCart({
            id: product._id,
            name: product.name,
            price: product.promotion === 'oui' ? product.promotionprice : product.price,
            image: product.imageUrl
          })}
          className="custom-cart-btn"
        >
          Ajouter au panier
        </button>
            </div>
        </div>
    ))}
</div>
        
           
            
        
        </div>
        <div class="footer_section layout_padding">
                   <div class="container">
                     <div class="footer_logo"><a href="index.html"><img src="./assets/images/footer-logo.png"/></a></div>
                     <div class="input_bt">
                       <input type="text" class="mail_bt" placeholder="Your Email" name="Your Email"/>
                       <span class="subscribe_bt" id="basic-addon2"><a href="#">Subscribe</a></span>
                     </div>
                     <div style={styles.banner}>
                           <h2 style={styles.title}>RETROUVEZ-NOUS SUR</h2>
                           <div style={styles.iconsContainer}>
                             <a 
                               href="https://www.instagram.com" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               style={{ color: 'inherit' }}
                             >
                               <FaInstagram 
                                 style={styles.icon} 
                                 onMouseEnter={(e) => e.target.style.color = '#E1306C'} 
                                 onMouseLeave={(e) => e.target.style.color = '#555'} 
                               />
                             </a>
                             
                             <a 
                               href="mailto:bahaakrimi145@gmail.com"
                               style={{ color: 'inherit' }}
                             >
                               <FaEnvelope 
                                 style={styles.icon} 
                                 onMouseEnter={(e) => e.target.style.color = '#D44638'} 
                                 onMouseLeave={(e) => e.target.style.color = '#555'} 
                               />
                             </a>
                             
                             <a 
                               href="https://www.facebook.com" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               style={{ color: 'inherit' }}
                             >
                               <FaFacebook 
                                 style={styles.icon} 
                                 onMouseEnter={(e) => e.target.style.color = '#4267B2'} 
                                 onMouseLeave={(e) => e.target.style.color = '#555'} 
                               />
                             </a>
                           </div>
                         </div>
                     <div class="footer_menu">
                       <ul>
                         <li><a href="#">Best Sellers</a></li>
                         <li><a href="#">Gift Ideas</a></li>
                         <li><a href="#">New Releases</a></li>
                         <li><a href="#">Today's Deals</a></li>
                         <li><a href="#">Customer Service</a></li>
                       </ul>
                     </div>
                     <div class="location_main">Help Line Number : <a href="#">+216 123 456 78</a></div>
                   </div>
                 </div>
      
      </CartProvider>
          
          
      </>
      
  );
}
// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  filterContainer: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px'
  },
  title: {
    color: '#333',
    marginBottom: '20px'
  },
  filterForm: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '150px'
  },
  filterButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  productCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    position: 'relative',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }
  },
  promotionBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '15px',
    borderRadius: '4px'
  },
  productName: {
    margin: '0 0 10px 0',
    fontSize: '1.2rem',
    color: '#333'
  },
  priceContainer: {
    marginBottom: '10px'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  originalPrice: {
    fontSize: '1rem',
    color: '#95a5a6',
    textDecoration: 'line-through',
    marginRight: '10px'
  },
  discountedPrice: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  stock: {
    color: '#27ae60',
    marginBottom: '15px'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  orderButton: {
    padding: '8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cartButton: {
    padding: '8px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  
};



export default App;
