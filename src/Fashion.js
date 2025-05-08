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
      <div class="banner_bg_main">
        {/* ... (le reste du header reste identique) ... */}
      </div>
      
      <div class="fashion_section">
        <div id="fashion_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Fashion</h1>
                <div class="fashion_section_2">
                  <div class="row">
                    {fashionProduits.map((produit) => (
                      <div class="col-lg-4 col-sm-4" key={produit._id}>
                        <div class="box_main">
                          <h4 class="shirt_text">{produit.name}</h4>
                          <p class="price_text">Price <span style={{ color: "#262626" }}>${produit.price}</span></p>
                          <div class="fashion_img">
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
          <a class="carousel-control-prev" href="#fashion_main_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-right"></i>
          </a>
          <a class="carousel-control-next" href="#fashion_main_slider" role="button" data-slide="next">
            <i class="fa fa-angle-left"></i>
          </a>
        </div>
      </div>

      {/* ... (le footer reste identique) ... */}
    </>
  );
}

export default Fashion;