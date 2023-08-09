import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="main__heading">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__paragraph">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <a
          href="https://practicum.yandex.ru/blog/zachem-nuzhen-html/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          HTML
        </a>
        <a
          href="https://practicum.yandex.ru/blog/chto-takoe-css/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          CSS
        </a>
        <a
          href="https://practicum.yandex.ru/blog/chto-takoe-javascript-zachem-nuzhen/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          JS
        </a>
        <a href="https://react.dev/" className="techs__list-item">
          React
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          Git
        </a>
        <a
          href="https://expressjs.com/ru/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          Express.js
        </a>
        <a
          href="https://www.mongodb.com/"
          target="_blank"
          rel="noreferrer"
          className="techs__list-item"
        >
          mongoDB
        </a>
      </ul>
    </section>
  );
}

export default Techs;
