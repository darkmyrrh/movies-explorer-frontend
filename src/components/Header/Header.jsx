import "./Header.css";
import { useLocation, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";
import logoLoggedIn from "../../images/logo_logged-in.svg";
import Sidebar from "../Sidebar/Sidebar";

function Header({ loggedIn, isVisible }) {
 
  const location = useLocation();
  const landingPage = location.pathname === "/";
  const headerClassName = `header ${landingPage ? "header_dark" : ""}`;

  const accountButtonClassName = `header__account-button app__button ${
    landingPage ? "header__account-button_green" : ""
  }`;

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  function openSidebar() {
    setIsSidebarOpened(true);
  }

  function closeSidebar() {
    setIsSidebarOpened(false);
  }
  if (!isVisible) {
    return null;
  }
  
  return (
    <header className={headerClassName}>
      <div className="header__container">
        {loggedIn ? (
          <>
            <img src={logoLoggedIn} alt="логотип" className="header__logo" />
            <ul className="header__nav">
              <NavLink
                className={({ isActive }) =>
                  `app__link header__link ${
                    landingPage ? "" : "header__link_black"
                  } ${isActive && "header__link_active"}`
                }
                to="/movies"
              >
                Фильмы
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `app__link header__link ${
                    landingPage ? "" : "header__link_black"
                  } ${isActive && "header__link_active"}`
                }
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
            <button
              className={`header__burger-menu app__button ${
                landingPage ? "header__burger-menu_white" : ""
              }`}
              onClick={openSidebar}
            />
            <Sidebar isOpened={isSidebarOpened} onCloseSidebar={closeSidebar} />
          </>
        ) : (
          <>
            <img src={logo} alt="логотип" className="header__logo" />
            <ul className="header__buttons">
              <Link to="/register" className="header__link app__link">
                Регистрация
              </Link>
              <Link to="/login">
                <button className="header__button app__button">Войти</button>
              </Link>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
