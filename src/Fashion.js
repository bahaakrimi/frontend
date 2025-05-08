import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PayPage from './PayPage';
import LoginForm from './LoginForm';

function Fashion() {
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

  // Filtrer les produits de la catégorie "fashion"
  const fashionProduits = produits.filter(produit => produit.category === 'fashion');

  return (
    <>
      <div className="banner_bg_main">
        <div className="container">
          <div className="header_section_top">
            <div className="row">
              <div className="col-sm-12">
                <div className="custom_menu">
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

        <div className="logo_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo"><a href="index.html"><img src="./assets/images/logo.png" alt="logo"/></a></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="header_section">
          <div className="container">
            <div className="containt_main">
              <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={() => {}}>&times;</a>
                <a href="index.html">Home</a>
                <a href="fashion.html">Fashion</a>
                <a href="electronic.html">Electronic</a>
                <a href="jewellery.html">Jewellery</a>
              </div>
              <span className="toggle_icon" onClick={() => {}}><img src="./assets/images/toggle-icon.png" alt="toggle"/></span>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Category</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
              <div className="main">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search this blog"/>
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" style={{color: "#f26522"}}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="header_box">
                <div className="lang_box">
                  <a href="#" title="Language" className="nav-link" data-toggle="dropdown" aria-expanded="true">
                    <img src="./assets/images/flag-uk.png" alt="flag" className="mr-2" title="United Kingdom"/> English <i className="fa fa-angle-down ml-2" aria-hidden="true"></i>
                  </a>
                  <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      <img src="./assets/images/flag-france.png" className="mr-2" alt="flag"/>
                      French
                    </a>
                  </div>
                </div>
                <div className="login_menu">
                  <ul>
                    <li><a href="#">
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      <span className="padding_10">Cart</span></a>
                    </li>
                    <li><a href="#">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <button onClick={goToCreationUser}>LOGIN</button></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="banner_section layout_padding">
          <div className="container">
            <div id="my_slider" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">Get Start <br/>Your favorite shopping</h1>
                      <div className="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">Get Start <br/>Your favorite shopping</h1>
                      <div className="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">Get Start <br/>Your favorite shopping</h1>
                      <div className="buynow_bt"><button onClick={handleBuyNowClick}>Buy Now</button></div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
                <i className="fa fa-angle-left"></i>
              </a>
              <a className="carousel-control-next" href="#my_slider" role="button" data-slide="next">
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fashion_section">
        <div id="fashion_main_slider" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <h1 className="fashion_taital">Fashion</h1>
                <div className="fashion_section_2">
                  <div className="row">
                    {fashionProduits.map((produit) => (
                      <div className="col-lg-4 col-sm-4" key={produit._id}>
                        <div className="box_main">
                          <h4 className="shirt_text">{produit.name}</h4>
                          <p className="price_text">Price <span style={{ color: "#262626" }}>${produit.price}</span></p>
                          <div className="fashion_img">
                            <img src={produit.imageUrl} alt={produit.name} />
                          </div>
                          <div className="btn_main">
                            <div className="buy_bt">
                              <button onClick={handleBuyNowClick}>Buy Now</button>
                            </div>
                            <div className="seemore_bt">
                              <Link to={`/${produit.name.toLowerCase()}`}>See More</Link>
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
          <a className="carousel-control-prev" href="#fashion_main_slider" role="button" data-slide="prev">
            <i className="fa fa-angle-right"></i>
          </a>
          <a className="carousel-control-next" href="#fashion_main_slider" role="button" data-slide="next">
            <i className="fa fa-angle-left"></i>
          </a>
        </div>
      </div>

      <div className="footer_section layout_padding">
        <div className="container">
          <div className="footer_logo"><a href="index.html"><img src="./assets/images/footer-logo.png" alt="footer logo"/></a></div>
          <div className="input_bt">
            <input type="text" className="mail_bt" placeholder="Your Email" name="Your Email"/>
            <span className="subscribe_bt" id="basic-addon2"><a href="#">Subscribe</a></span>
          </div>
          <div className="footer_menu">
            <ul>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Gift Ideas</a></li>
              <li><a href="#">New Releases</a></li>
              <li><a href="#">Today's Deals</a></li>
              <li><a href="#">Customer Service</a></li>
            </ul>
          </div>
          <div className="location_main">Help Line Number : <a href="#">+1 1800 1200 1200</a></div>
        </div>
      </div>
      
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">© 2020 All Rights Reserved. Design by <a href="https://html.design">Free html Templates</a></p>
        </div>
      </div>
    </>
  );
}

export default Fashion;