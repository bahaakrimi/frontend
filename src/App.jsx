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
import { CartProvider } from './context/CartContext';
import { useState } from 'react';

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

    // Gère l'ouverture/fermeture du menu déroulant
    const toggleFashionDropdown = (e) => {
      e.preventDefault(); // Empêche la navigation immédiate
      setShowFashionDropdown(!showFashionDropdown);
    };
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
      <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">PROMO</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                      <h1 style={{ color: 'red', backgroundColor: 'green' }}>EN PROMO</h1>

                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>15dt</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt2">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                      <h1 style={{  backgroundColor: 'red' }}>EN PROMO</h1>

                        <h4 class="shirt_text">computer</h4>
                        

                        <p class="price_text">Price  <span style={{color:" #262626;"}}>589dt</span></p>
                        <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                      <h1 style={{ color: 'red', backgroundColor: 'green' }}>EN PROMO</h1>


                        <h4 class="shirt_text">XBOX</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>429dt</span></p>
                        <div class="tshirt_img"><img src="./assets/images/xbox.jpg"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Women">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Man & Woman Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt2">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/dress-shirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Woman Scart</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="images/women-clothes-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Women">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Man & Woman Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/dress-shirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Woman Scart</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/women-clothes-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-right"></i>
          </a>
        
    </div><div class="fashion_section">
        <div id="main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Man & Woman Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt2">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/dress-shirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Woman Scart</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/women-clothes-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Women">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Man & Woman Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt2">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/dress-shirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tshirt">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Woman Scart</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="images/women-clothes-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Women">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Man & Woman Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man T -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/tshirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Man -shirt</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/dress-shirt-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Woman Scart</h4>
                        <p class="price_text">Price  <span style={{color:" #262626;"}}>$ 30</span></p>
                        <div class="tshirt_img"><img src="./assets/images/women-clothes-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div><div class="fashion_section">
        
        <div id="electronic_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Electronic</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Laptop</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/laptop-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Pc">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Mobile</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/mobile-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Tel">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Computers</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Cart">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Electronic</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Laptop</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/laptop-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Mobile</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/mobile-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Computers</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Electronic</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Laptop</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/laptop-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Mobile</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/mobile-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Computers</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#electronic_main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control-next" href="#electronic_main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div><div class="jewellery_section">
        <div id="jewellery_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Jewellery Accessories</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Jumkas</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/jhumka-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Jhumka">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Necklaces</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/neklesh-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Neklesh">See More</Link></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Kangans</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/kangan-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><Link to="/Kangan">See More</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Jewellery Accessories</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Jumkas</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/jhumka-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Necklaces</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/neklesh-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Kangans</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/kangan-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <h1 class="fashion_taital">Jewellery Accessories</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Jumkas</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/jhumka-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Necklaces</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/neklesh-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                      <div class="box_main">
                        <h4 class="shirt_text">Kangans</h4>
                        <p class="price_text">Start Price  <span style={{color:" #262626;"}}>$ 100</span></p>
                        <div class="jewellery_img"><img src="./assets/images/kangan-img.png"/></div>
                        <div class="btn_main">
                          <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                          <div class="seemore_bt"><a href="#">See More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            
            
          </div>
          
          <a class="carousel-control-prev" href="#jewellery_main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-right"></i>
          </a>
          <a class="carousel-control-next" href="#jewellery_main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-left"></i>
          </a>
          <div id="electronic_main_slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
               <div class="carousel-item active">
                  <div class="container">
                     <h1 class="fashion_taital">Jeux </h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">playstation</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/playstation.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/Playstation">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">nintendo</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/nintendo.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/Nintendo">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">xbox</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/xbox.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/Xbox">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="fashion_taital">Jeux </h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Laptop</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/laptop-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Mobile</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/mobile-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Computers</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="fashion_taital">Jeux</h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">playstation </h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/playstation.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">nintendo</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/nintendo.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">xbox</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/xbox.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <a class="carousel-control-prev" href="#electronic_main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-right"></i>
            </a>
            <a class="carousel-control-next" href="#electronic_main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-left"></i>
            </a>
         </div>
          <div class="fashion_section">
         <div id="electronic_main_slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
               <div class="carousel-item active">
                  <div class="container">
                     <h1 class="fashion_taital">Sports</h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Foot Ball</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/foot.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/Foot">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Raquettes</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/raquettes.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/Raquettes">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Hand Grip Des Mains</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/HandGripDesMains.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><Link to="/HandGripDesMains">see more</Link></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="fashion_taital">Electronic</h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Laptop</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/laptop-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Mobile</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/mobile-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Computers</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/computer-img.png"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="fashion_taital">Sports</h1>
                     <div class="fashion_section_2">
                        <div class="row">
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Foot Ball</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/foot.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">HandGripDesMains</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/HandGripDesMains.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 col-sm-4">
                              <div class="box_main">
                                 <h4 class="shirt_text">Raquettes</h4>
                                 <p class="price_text">Start Price  <span style={{color: "#262626;"}}>$ 100</span></p>
                                 <div class="electronic_img"><img src="./assets/images/raquettes.jpg"/></div>
                                 <div class="btn_main">
                                    <div class="buy_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                                    <div class="seemore_bt"><a href="#">See More</a></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div>
            <a class="carousel-control-prev" href="#electronic_main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-right"></i>
            </a>
            <a class="carousel-control-next" href="#electronic_main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-left"></i>
            </a></div>
            
         </div>
         
      </div>
      
          
          <div class="location_main">Help Line  Number : <a href="#">+1 1800 1200 1200</a></div>
        </div>
      </div><div class="copyright_section">
        <div class="container">
          <p class="copyright_text">© 2020 All Rights Reserved. Design by <a href="https://html.design">Free html  Templates</a></p>
        </div>
      </div></>
  );
}

export default App;
