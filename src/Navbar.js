import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;