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

  const accountButtonClassName = `header__account-button root__button ${
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
            <Link to="/" className="header__link root__link">
              <img src={logoLoggedIn} alt="логотип" className="header__logo" />
            </Link>
            <ul className="header__nav">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `root__link header__link ${
                      landingPage ? "" : "header__link_black"
                    } ${isActive && "header__link_active"}`
                  }
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `root__link header__link ${
                      landingPage ? "" : "header__link_black"
                    } ${isActive && "header__link_active"}`
                  }
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <Link to="/profile">
              <button type="button" className={accountButtonClassName}>
                Аккаунт
              </button>
            </Link>
            <button
              className={`header__burger-menu root__button ${
                landingPage ? "header__burger-menu_white" : ""
              }`}
              onClick={openSidebar}
            />
            <Sidebar isOpened={isSidebarOpened} onCloseSidebar={closeSidebar} />
          </>
        ) : (
          <>
            <Link to="/" className="header__link root__link">
              <img src={logo} alt="логотип" className="header__logo" />
            </Link>
            <ul className="header__buttons">
              <li>
                <Link to="/register" className="header__link root__link">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="header__button root__button">Войти</button>
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
