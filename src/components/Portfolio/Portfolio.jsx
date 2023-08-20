import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link root__link">
        <a
          href="https://darkmyrrh.github.io/how-to-learn/"
          className="portfolio__link-text"
          target="_blank"
          rel="noreferrer"
        >Статичный сайт
        </a>
        </li>
        <li className="portfolio__link root__link">
        <a
          href="https://darkmyrrh.github.io/russian-travel/"
          className="portfolio__link-text"
          target="_blank"
          rel="noreferrer"
        >Адаптивный сайт
        </a>
        </li>
        <li className="portfolio__link root__link">
        <a
          href="https://mesto.myrrh.ru"
          className="portfolio__link-text"
          target="_blank"
          rel="noreferrer"
        >Одностраничное приложение
        </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
