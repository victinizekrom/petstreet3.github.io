import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="pet-street">Pet Street</Link>
      <ul>
        <li><Link to="/cadastro-de-usuario">Cadastro de Usuário</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/animais-para-adocao">Animais para Adoção</Link></li>
        <li><Link to="/cadastro-de-animais">Cadastro de Animais</Link></li>
        <li><Link to="/menu">App</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

