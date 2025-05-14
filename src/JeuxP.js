import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';

function Jeux() {
  const { totalItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProduits, setFilteredProduits] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch('http://localhost:5000/produit/with-images?category=jeux');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProduits(data);
        setFilteredProduits(data); // Initialiser avec tous les produits jeux
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredProduits(produits); // Si recherche vide, afficher tous les jeux
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filtered = produits.filter(produit =>
      produit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduits(filtered);
  };

  const handleBuyNowClick = () => {
    navigate('/cmande');
  };

  const goToCreationUser = () => {
    navigate('/LoginForm');
  };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <CartProvider>
      {/* Header et bannière inchangés */}
      <div class="banner_bg_main">
        {/* ... code existant ... */}
      </div>

      <div class="fashion_section">
        <div id="electronic_main_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <h1 class="fashion_taital">Jeux</h1>
                <div class="search-container" style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un jeu..."
                    style={{ padding: '8px', width: '300px' }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    onClick={handleSearch}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '10px'
                    }}
                  >
                    Rechercher
                  </button>
                </div>

                {isSearching && filteredProduits.length === 0 && (
                  <p style={{ color: 'red' }}>Aucun jeu trouvé avec ce terme de recherche</p>
                )}

                <div class="fashion_section_2">
                  <div class="row">
                    {filteredProduits.map((produit) => (
                      <div class="col-lg-4 col-sm-4" key={produit._id}>
                        <div class="box_main">
                          <h4 class="shirt_text">{produit.name}</h4>
                          <p class="price_text">Prix <span style={{ color: "#262626" }}>{produit.price}€</span></p>
                          <div class="electronic_img">
                            <img src={produit.imageUrl} alt={produit.name} />
                          </div>
                          <div class="btn_main">
                            <div class="buy_bt">
                              <button onClick={handleBuyNowClick}>
                                Ajouter une commande
                              </button>
                            </div>
                            <div class="seemore_bt">
                              <button 
                                className="add-to-cart"
                                onClick={() => addToCart({
                                  id: produit._id,
                                  name: produit.name,
                                  price: produit.price,
                                  image: produit.imageUrl
                                })}
                              >
                                Ajouter au panier
                              </button>
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
        </div>
      </div>

      {/* Footer inchangé */}
      <div class="footer_section layout_padding">
        {/* ... code existant ... */}
      </div>
    </CartProvider>
  );
}

export default Jeux;