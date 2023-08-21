import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="main__heading">Студент</h2>
      <article className="about-me__info">
        <div className="about-me__info-text">
          <h3 className="about-me__info-title">Светлана</h3>
          <p className="about-me__info-subtitle">
            Фронтенд-разработчик, 37 лет
          </p>
          <p className="about-me__info-paragraph">
            Я родилась в городе Энгельс. Окончила Филологический факультет СГУ,
            после выпуска переехала в Санкт-Петербург. Работа ИТ-переводчиком
            вдохновила меня на смену специальности, и теперь я решила заняться
            фронтендом. А еще я люблю читать, путешествовать и изучать новые
            технологии.
          </p>
          <a
            href="https://github.com/darkmyrrh/"
            className="about-me__info-link app__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="Фото" className="about-me__photo" />
      </article>
    </section>
  );
}

export default AboutMe;
