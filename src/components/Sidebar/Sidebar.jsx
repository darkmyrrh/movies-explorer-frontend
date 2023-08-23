import "./Sidebar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpened, onCloseSidebar }) {
  const sidebarClassName = `sidebar ${isOpened ? "sidebar_opened" : ""}`;
  const navigate = useNavigate()

  function closeSidebar() {
    onCloseSidebar();
    navigate("/profile", { replace: true });
  }

  return (
    <section className={sidebarClassName}>
      <div className="sidebar__container">
        <button
          type="button"
          className="sidebar__close app__button"
          onClick={closeSidebar}
        />
        <ul className="sidebar__nav">
          <li className="sidebar__nav-item ">
            <NavLink
              className={({ isActive }) =>
                `sidebar__link app__link ${isActive && "sidebar__link_active"}`
              }
              to="/"
              onClick={closeSidebar}
            >
              Главная
            </NavLink>
          </li>
          <li className="sidebar__nav-item">
            <NavLink
              className={({ isActive }) =>
                `sidebar__link app__link ${isActive && "sidebar__link_active"}`
              }
              to="/movies"
              onClick={closeSidebar}
            >
              Фильмы
            </NavLink>
          </li>
          <li  className="sidebar__nav-item">
            <NavLink
              className={({ isActive }) =>
                `sidebar__link app__link ${isActive && "sidebar__link_active"}`
              }
              to="/saved-movies"
              onClick={closeSidebar}
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <button
            type="button"
            className="header__account-button sidebar__account-button app__button"
            onClick={closeSidebar}
          >
            Аккаунт
          </button>
      </div>
    </section>
  );
}

export default Sidebar;
