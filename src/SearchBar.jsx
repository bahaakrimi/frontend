import React, { useState } from "react";

function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch(http://localhost:5000/produit/search?query=${encodeURIComponent(query)});
      const data = await res.json();
      onResults(data);
    } catch (err) {
      console.error("Erreur de recherche :", err);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search this blog"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default SearchBar;
localhost