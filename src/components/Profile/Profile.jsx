import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormValidation";

function Profile({ onUpdateUser, onExit, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
    setIsSubmitVisible(false);
    setIsInputDisabled(true);
    setIsSubmitDisabled(true);
  }

  function enableEditing() {
    setIsSubmitVisible(true);
  }

  const isButtonEnabled =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" noValidate>
        <label
          htmlFor="name"
          className={`profile__label ${errors.name && "profile__label_error"}`}
        >
          Имя
          <input
            type="text"
            placeholder={currentUser.name}
            className={`profile__input ${
              errors.name && "profile__input_error"
            }`}
            name="name"
            id="name"
            disabled={isSubmitVisible || !isInputDisabled ? false : true}
            required
            pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
            onChange={handleChange}
            value={values.name || currentUser.name || ""}
          />
        </label>
        <span className="profile__error-text">{errors.name}</span>
        <label
          htmlFor="email"
          className={`profile__label ${errors.email && "profile__label_error"}`}
        >
          E-mail
          <input
            type="text"
            placeholder={currentUser.email}
            className={`profile__input ${
              errors.email && "profile__input_error"
            }`}
            name="email"
            id="email"
            disabled={isSubmitVisible || !isInputDisabled ? false : true}
            required
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            onChange={handleChange}
            value={values.email || currentUser.email || ""}
          />
        </label>
        <span className="profile__error-text">{errors.email}</span>
      </form>
      {isSubmitVisible ? (
        <button
          type="submit"
          className={`profile__submit ${
            isButtonEnabled ? "" : "profile__submit_disabled"
          }`}
          onClick={handleSubmit}
          disabled={isButtonEnabled || !isSubmitDisabled ? false : true}
        >
          {isLoading ? "Сохранение" : "Сохранить"}
        </button>
      ) : (
        <ul className="profile__links">
          <li>
            <button
              type="button"
              className="profile__link app__link"
              onClick={enableEditing}
            >
              Редактировать
            </button>
          </li>
          <li>
            <button
              type="button"
              className="profile__link profile__link_red app__link"
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
