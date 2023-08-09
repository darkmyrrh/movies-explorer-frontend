import "./Profile.css";
import { useState } from "react";

function Profile({onSubmit}) {
    const [isSubmitVisible, setIsSubmitVisible] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const submitClassName = `profile__submit ${isSubmitDisabled && "profile__submit_disabled"}`

    function enableEditing () {
        setIsSubmitVisible(true);
    }
    
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" onSubmit={onSubmit}>
        <label htmlFor="name" className="profile__label">Имя
          <input type="text" placeholder="Виталий" className="profile__input" name="name"/>
          </label>
          <label htmlFor="email" className="profile__label">Почта
          <input
            type="text"
            placeholder="test@test.ru"
            className="profile__input"
            name="email"
          />
          </label>
          {isSubmitVisible ? (
          <button type="submit" className={submitClassName}>
          Сохранить
        </button>) : ( <>
        <button type="button" className="profile__edit" onClick={enableEditing}>
          Редактировать
        </button>
      
      <button type="button" className="profile__exit">
        Выйти из аккаунта
      </button></>)}
      </form>

    </section>
  );
}

export default Profile;
