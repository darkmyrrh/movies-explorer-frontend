import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="main__heading">Студент</h2>
      <img src={photo} alt="Фото" className="about-me__photo" />
      <h3 className="about-me__title">Светлана</h3>
      <p className="about-me__subtitle">Фронтенд-разработчик, 37 лет</p>
      <p className="about-me__paragraph">
        Я родилась в городе Энгельс. Окончила Филологический факультет СГУ,
        после выпуска переехала в Санкт-Петербург. Работа ИТ-переводчиком
        вдохновила меня на смену специальности, и теперь я решила заняться
        фронтендом. А еще я люблю читать, путешествовать и изучать новые
        технологии.
      </p>
      <a
        href="https://github.com/darkmyrrh/"
        className="about-me__link app__link"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </section>
  );
}

export default AboutMe;
