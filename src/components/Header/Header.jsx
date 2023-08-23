import "./Header.css";
import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";
import Sidebar from "../Sidebar/Sidebar";

function Header({ loggedIn, isVisible }) {
  const location = useLocation();
  const navigate = useNavigate();
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
  function handleProfileButtonClick () {
    navigate("/profile", { replace: true })
  }
  function handleLoginButtonClick () {
    navigate("/login", { replace: true })
  }

  if (!isVisible) {
    return null;
  }

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/" className="header__link app__link">
          <img src={logo} alt="логотип" className="header__logo" />
        </Link>
        {loggedIn ? (
          <>
            <ul className="header__nav">
              <li>
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
              </li>
              <li>
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
              </li>
            </ul>
            <button
              type="button"
              className={accountButtonClassName}
              onClick={handleProfileButtonClick}
            >
              Аккаунт
            </button>
            <button
              className={`header__burger-menu app__button ${
                landingPage ? "header__burger-menu_white" : ""
              }`}
              onClick={openSidebar}
            />
            <Sidebar isOpened={isSidebarOpened} onCloseSidebar={closeSidebar} />
          </>
        ) : (
          <ul className="header__buttons">
            <li>
              <Link to="/register" className="header__link app__link">
                Регистрация
              </Link>
            </li>
            <li>
              <button className="header__button app__button" onClick={handleLoginButtonClick}>Войти</button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
