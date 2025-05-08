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

import { CartContext } from './context/CartContext';
import Panier from './Panier'
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';





function App() {

    const navigate = useNavigate();
    
    const handleBuyNowClick = () => {
        // Redirection vers la page de paiement
        navigate('/paypage');
    };
    
    const goToCreationUser = () => {
        navigate('/LoginForm');
    };
    
    const [showFashionDropdown, setShowFashionDropdown] = useState(false);
      const products = [
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
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch('http://localhost:5000/produit/with-images');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProduits(data);
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
    
  return (
   
    <><div class="banner_bg_main">
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
                  <li><Link to="Panier">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span class="padding_10">Panier</span></Link>
                  </li>
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
      <div className="fashion-section">
            
            <div className="produits-container">
                {produits.map((produit) => (
                    <div key={produit._id} className="produit-card">
                        <img 
                            src={produit.imageUrl} 
                            alt={produit.name}
                            className="produit-image"
                        />
                        <h3>{produit.name}</h3>
                        <p className="price">Price ${produit.price}</p>
                        <div className="button-group">
                            <button className="buy-now">Buy Now</button>
                            <Link to={`/produit/${produit._id}`} className="see-more">See More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      
      
          
          
      </>
  );
}

export default App;
