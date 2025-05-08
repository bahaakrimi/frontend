import React, { useState } from "react";
import SearchBar from "./SearchBar"; // Assurez-vous que le chemin est correct

function HomePage() {
  const [produits, setProduits] = useState([]);

  return (
    <div>
      <h2>Bienvenue sur Eflyer</h2>
      <SearchBar onResults={setProduits} />

      <div style={{ marginTop: '20px' }}>
        {produits.length > 0 ? (
          produits.map((produit) => (
            <div key={produit._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{produit.nom}</h3>
              <p>{produit.description}</p>
              <p>Prix : {produit.prix} TND</p>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;