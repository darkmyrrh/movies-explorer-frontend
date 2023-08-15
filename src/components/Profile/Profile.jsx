import "./Profile.css";
import { useState } from "react";

function Profile({ onSubmit, onExit }) {
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const submitClassName = `profile__submit app__button ${
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
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value="name"
          />
        </label>
        <label htmlFor="email" className="profile__label">
          Почта
          <input
            type="text"
            placeholder="test@test.ru"
            className="profile__input"
            name="email"
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value="email"
          />
        </label>
        {isSubmitVisible ? (
          <button
            type="submit"
            className={submitClassName}
            disabled={isSubmitDisabled ? true : false}
          >
            Сохранить
          </button>
        ) : (
          <>
            <button
              type="button"
              className="profile__edit app__button"
              onClick={enableEditing}
            >
              Редактировать
            </button>

            <button
              type="button"
              className="profile__exit app__button"
              onClick={onExit}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
