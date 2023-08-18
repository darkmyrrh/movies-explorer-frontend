import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

function Sidebar({ isOpened, onCloseSidebar }) {
  const sidebarClassName = `sidebar ${isOpened ? "sidebar_opened" : ""}`;

  function closeSidebar() {
    onCloseSidebar();
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
          <NavLink
            className={({ isActive }) =>
              `sidebar__link app__link ${isActive && "sidebar__link_active"}`
            }
            to="/"
            onClick={closeSidebar}
          >
            Главная
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `sidebar__link app__link ${isActive && "sidebar__link_active"}`
            }
            to="/movies"
            onClick={closeSidebar}
          >
            Фильмы
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `sidebar__link app__link ${isActive && "sidebar__link_active"}`
            }
            to="/saved-movies"
            onClick={closeSidebar}
          >
            Сохраненные фильмы
          </NavLink>
        </ul>
        <Link to="/profile" className="sidebar__link_no-underline">
          <button
            type="button"
            className="header__account-button sidebar__account-button app__button"
            onClick={closeSidebar}
          >
            Аккаунт
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Sidebar;
