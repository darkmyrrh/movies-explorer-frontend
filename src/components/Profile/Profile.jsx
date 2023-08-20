import "./Profile.css";
import { useState } from "react";

function Profile({ onSubmit, onExit }) {
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const submitClassName = `profile__submit root__button ${
    isSubmitDisabled && "profile__submit_disabled"
  }`;

  const handleChange = () => {
    setIsSubmitDisabled(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    setIsSubmitDisabled(true);
  };

  function enableEditing() {
    setIsSubmitVisible(true);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="profile__label">
          Имя
          <input
            type="text"
            placeholder="Виталий"
            className="profile__input"
            name="name"
            id="name"
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value="Виталий"
          />
        </label>
        <label htmlFor="email" className="profile__label">
          E-mail
          <input
            type="text"
            placeholder="test@test.ru"
            className="profile__input"
            name="email"
            id="email"
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value="test@test.ru"
          />
        </label>
      </form>
      {isSubmitVisible ? (
        <button
          type="submit"
          className={submitClassName}
          disabled={isSubmitDisabled ? true : false}
        >
          Сохранить
        </button>
      ) : (
        <ul className="profile__links">
          <li>
            <button
              type="button"
              className="profile__link root__link"
              onClick={enableEditing}
            >
              Редактировать
            </button>
          </li>
          <li>
            <button
              type="button"
              className="profile__link profile__link_red root__link"
              onClick={onExit}
            >
              Выйти из аккаунта
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}

export default Profile;
