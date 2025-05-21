import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PayPage from './PayPage';
import LoginForm from './LoginForm';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import axios from 'axios';
import './Jeux.css';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

function Jewellery() {
  const { totalItems } = useCart(); // Ajoutez cette ligne
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jeux, setJeux] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [currentProductId, setCurrentProductId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);


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
  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produit/with-images');
        const jeuxProduits = response.data.filter(produit => produit.category === 'sport');
        setJeux(jeuxProduits);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJeux();
  }, []);

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
 



  const goToCreationUser = () => {
    navigate('/LoginForm');
  };

  const handleBuyNowClick = () => {
        // Redirection vers la page de paiement
        navigate('/cmande');
    };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  // Filtrer les produits de la catégorie "jewellery"
  const jewelleryProduits = produits.filter(produit => produit.category === 'sport');
  // Style JSX intégré
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


  // Filtrer les produits de la catégorie "fashion"
  const fashionProduits = produits.filter(produit => produit.category === 'sport');
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
                  <li><Link to="/Fashion">Fashion</Link></li>
                    
                  <li><Link to="/Jewellery">Jewellery</Link></li>
                  <li><Link to="/Sports">Sports</Link></li>
                  <li><Link to="/Jeux">Jeux</Link></li>
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
                    <div class="container">
                      <div class="containt_main">
                        <div id="mySidenav" class="sidenav">
                          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                          <a href="index.html">Home</a>
                          <a href="Electronic">Electronics</a>
                          
                        </div>
                        <span class="toggle_icon" onclick="openNav()"><img src="./assets/images/toggle-icon.png" /></span>
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
                          <div class="lang_box ">
                            <a href="#" title="Language" class="nav-link" data-toggle="dropdown" aria-expanded="true">
                              <img src="./assets/images/flag-uk.png" alt="flag" class="mr-2 " title="United Kingdom" /> English <i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
                            </a>
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
                                <div class="buynow_bt"><Link to="/Electronic">aaauy Now</Link></div>
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
      <div className="fashion_section">
        <div id="jewellery_main_slider" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <h1 className="fashion_taital">Sports</h1>
                <div className="fashion_section_2">
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
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
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
                <p style={{ 
                    margin: 0,
                    fontSize: '1.3rem',
                    color: '#e74c3c',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px'
                }}>
                    {product.price}dt
                </p>
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
                        e.target.src = `${window.location.origin}/default-product.png`;
                    }}
                />
            </div>
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
            

            {/* Bouton élargi */}
            <div style={{ textAlign: 'center' }}>
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
                   <div className="jeux-container">
                    
      {jeux.map(jeu => (
        <div key={jeu._id} className={`jeu-card ${jeu.promotion === 'oui' ? 'promo' : ''}`}>
          {jeu.promotion === 'oui' && (
            <div className="promo-banner">EN PROMOTION</div>
          )}
          
          <div className="jeu-image-container">
            <img 
              src={jeu.imageUrl} 
              alt={jeu.name}
              onError={(e) => {
                e.target.src = 'http://localhost:5000/files/default-product.png';
              }}
            />
          </div>
          
          <div className="jeu-info">
            <h3>{jeu.name}</h3>
            
            <div className="jeu-pricing">
              {jeu.promotion === 'oui' ? (
                <>
                  <span className="original-price">{jeu.price} TND</span>
                  <span className="promo-price">{jeu.promotionprice} TND</span>
                </>
              ) : (
                <span className="normal-price">{jeu.price} TND</span>
              )}
            </div>
            
            <div className="jeu-stock">
              Disponible: {jeu.nbrproduit} unités
            </div>
          </div>

          {/* Formulaire de feedback */}
          <div className="feedback-form">
            <h3>Leave Your Feedback</h3>
            
            {message && currentProductId === jeu._id && (
              <div className="alert alert-success">{message}</div>
            )}
            {error && currentProductId === jeu._id && (
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

            {currentProductId === jeu._id && (
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
                    onClick={() => handleSubmitFeedback(jeu._id)}
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

            {currentProductId !== jeu._id && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentProductId(jeu._id)}
              >
                Donner votre avis
              </button>
            )}
          </div>

          <div className="product-actions">
             <button 
  onClick={() => navigate('/Cmande', { 
    state: { 
      productName: jeu.name, 
      
    }
  })}
>
  Ajouter une commande
</button>
            <button 
              onClick={() => addToCart({
                id: jeu._id,
                name: jeu.name,
                price: jeu.promotion === 'oui' ? jeu.promotionprice : jeu.price,
                image: jeu.imageUrl
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
              </div>
            </div>
          </div>
          
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
      </div></CartProvider>
    </>
  );
}


export default Jewellery;