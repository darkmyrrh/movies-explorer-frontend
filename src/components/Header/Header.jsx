import "./Header.css";
import { useLocation, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";
import logoLoggedIn from "../../images/logo_logged-in.svg";
import Sidebar from "../Sidebar/Sidebar";

function Header({loggedIn}) {
  const location = useLocation();
  const headerClassName = `header ${
    location.pathname === "/" ? "header_dark" : ""
  }`;

  const accountButtonClassName = `header__account-button app__button ${
    location.pathname === "/" ? "header__account-button_white" : ""
  }`;

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  function openSidebar () {
    setIsSidebarOpened(true);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }
  
  return (
    <header className={headerClassName}>
      <div className="header__container">
        {loggedIn ? (
          <>
            <img src={logoLoggedIn} alt="логотип" className="header__logo" />            
            <ul className="header__nav">
              <NavLink
                className={({ isActive }) =>`header__link header__link_black app__link ${isActive && 'header__link_active'}`}
                to="/movies"
              >
                Фильмы
              </NavLink>
              <NavLink
                className={({ isActive }) =>`header__link header__link_black app__link ${isActive && 'header__link_active'}`}
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>              
            </ul>
            <Link to="/profile">
              <button type="button" className={accountButtonClassName}>
                Аккаунт
              </button>
            </Link>
            <button className="header__burger-menu app__button" onClick={openSidebar}/>
            <Sidebar isOpened={isSidebarOpened} onCloseSidebar={closeSidebar} />
          </>
        ) : (
          <>
            <img src={logo} alt="логотип" className="header__logo" />
            <ul className="header__nav">
              <li className="header__link app__link">Регистрация</li>
              <li>
                <button className="header__button app__button">Войти</button>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
