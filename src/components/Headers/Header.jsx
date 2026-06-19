import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">📦</div>

        <div className="logo-text">
          <h1>Главный склад</h1>
          <span>Система управления складом</span>
        </div>
      </div>

      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/warehouse">Склад</Link>
        <Link to="/products">Товары</Link>
      </nav>

      <div className="user">
        <span>Администратор</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Профиль"
        />
      </div>
    </header>
  );
}

export default Header;