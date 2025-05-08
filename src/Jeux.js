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

function Jeux() {
  const navigate = useNavigate();
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const goToCreationUser = () => {
    navigate('/LoginForm');
  };

  const handleBuyNowClick = () => {
    navigate('/paypage');
  };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  // Filtrer les produits de la catégorie "jeux" (ajustez selon votre structure de données)
  const jeuxProduits = produits.filter(produit => produit.category === 'jeux');

  return (
    <>
      {/* ... (conservez tout le code existant jusqu'à la section fashion_section) ... */}
      <div class="banner_bg_main">
         <div class="container">
            <div class="header_section_top">
               <div class="row">
                  <div class="col-sm-12">
                     <div class="custom_menu">
                        <ul>
                        <li><Link to="/app">HOME</Link></li>
                         <li><Link to="/Electronic">Electronic</Link></li>
                         <li><Link to="/Fashion">Fashion</Link></li>
                          <li><Link to="/Jewellery">Jewellery</Link></li>
                          <li><Link to="/Sports">Sports</Link></li>
                          <li><Link to="/Jeux">Jeux</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="logo_section">
            <div class="container">
               <div class="row">
                  <div class="col-sm-12">
                     <div class="logo"><a href="index.html"><img src="./assets/images/logo.png"/></a></div>
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
                     <a href="fashion.html">Fashion</a>
                     <a href="electronic.html">Electronic</a>
                     <a href="jewellery.html">Jewellery</a>
                  </div>
                  <span class="toggle_icon" onclick="openNav()"><img src="./assets/images/toggle-icon.png"/></span>
                  <div class="dropdown">
                     <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Category 
                     </button>
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                     </div>
                  </div>
                  <div class="main">
                     <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search this blog"/>
                        <div class="input-group-append">
                           <button class="btn btn-secondary" type="button" style={{color:"#f26522;"}}>
                           <i class="fa fa-search"></i>
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="header_box">
                     <div class="lang_box ">
                        <a href="#" title="Language" class="nav-link" data-toggle="dropdown" aria-expanded="true">
                        <img src="./assets/images/flag-uk.png" alt="flag" class="mr-2 " title="United Kingdom"/> English <i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu ">
                           <a href="#" class="dropdown-item">
                           <img src="./assets/images/flag-france.png" class="mr-2" alt="flag"/>
                           French
                           </a>
                        </div>
                     </div>
                     <div class="login_menu">
                        <ul>
                           <li><a href="#">
                              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                              <span class="padding_10">Cart</span></a>
                           </li>
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
                              <div class="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                           </div>
                        </div>
                     </div>
                     <div class="carousel-item">
                        <div class="row">
                           <div class="col-sm-12">
                              <h1 class="banner_taital">Get Start <br></br>Your favriot shoping</h1>
                              <div class="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                           </div>
                        </div>
                     </div>
                     <div class="carousel-item">
                        <div class="row">
                           <div class="col-sm-12">
                              <h1 class="banner_taital">Get Start <br></br>Your favriot shoping</h1>
                              <div class="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
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
                  <div class="row">
                    {jeuxProduits.map((produit) => (
                      <div class="col-lg-4 col-sm-4" key={produit._id}>
                        <div class="box_main">
                          <h4 class="shirt_text">{produit.name}</h4>
                          <p class="price_text">Price <span style={{ color: "#262626" }}>${produit.price}</span></p>
                          <div class="electronic_img">
                            <img src={produit.imageUrl} alt={produit.name} />
                          </div>
                          <div class="btn_main">
                            <div class="buy_bt">
                              <button onClick={handleBuyNowClick}>Buy Now</button>
                            </div>
                            <div class="seemore_bt">
                              <Link to={`/${produit.name.toLowerCase()}`}>see more</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ... (conservez le reste du code existant) ... */}
        </div>
      </div>

      {/* ... (conservez le reste du code existant) ... */}
    </>
  );
}

export default Jeux;