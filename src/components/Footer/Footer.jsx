import "./Footer.css";

function Footer({ isVisible }) {
  if (!isVisible) {
    return null;
  }
  return (
    <footer className="footer">
      <h2 className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__date">&#169; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
              className="footer__link root__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/darkmyrrh/"
              target="_blank"
              rel="noreferrer"
              className="footer__link root__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
