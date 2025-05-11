import { useState, useEffect } from 'react';
import App from './App';
import Fashion from './Fashion';
import Jewellery from './Jewellery';
import { Form, Link } from 'react-router-dom';
import PayPage from './PayPage';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Playstation from './Playstation';
import Nintendo from './Nintendo';
import Xbox from './Xbox';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import axios from 'axios';
import './Jeux.css';

function Jeux() {
 const { totalItems } = useCart(); // Ajoutez cette ligne
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);

  const jeuxProduits = produits.filter(produit => produit.category === 'jeux');
  const [jeux, setJeux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const handleBuyNowClick = () => {
        // Redirection vers la page de paiement
        navigate('/cmande');
    };  
  const goToCreationUser = () => {
    navigate('/login');
  };
  // Filtrer les produits de la catégorie "jeux" (ajustez selon votre structure de données)
  

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produit/with-images');
        const jeuxProduits = response.data.filter(produit => produit.category === 'jeux');
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
                  <Link to="/Cmande"><button  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Command
                  </button></Link>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div class="main">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search this blog" />
                    <div class="input-group-append">
                      <button class="btn btn-secondary" type="button" >
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
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
                      <li><a href="#">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <button onClick={goToCreationUser} >LOGIN</button></a>
                      </li>
                      <li><a href="#">
                        
                        <button >LOGOUT</button></a>
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
      <div class="fashion_section">
        <div id="electronic_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Jeux</h1>
                <div class="fashion_section_2">
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
      <div className="product-actions">
        <button 
          className="custom-order-btn"
          onClick={handleBuyNowClick}
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
      </div></CartProvider>

     
    </>
  );
}

export default Jeux;