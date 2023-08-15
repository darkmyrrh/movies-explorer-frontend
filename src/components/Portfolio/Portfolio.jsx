import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="potfolio__links">
        <a
          href="https://darkmyrrh.github.io/how-to-learn/"
          className="portfolio__link app__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link-text">Статичный сайт</p>
          <p className="portfolio__link-text">&#129125;</p>
        </a>
        <a
          href="https://darkmyrrh.github.io/russian-travel/"
          className="portfolio__link app__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <p className="portfolio__link-text">&#129125;</p>
        </a>
        <a
          href="https://mesto.myrrh.ru"
          className="portfolio__link app__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <p className="portfolio__link-text">&#129125;</p>
        </a>
      </ul>
    </section>
  );
}

export default Portfolio;
