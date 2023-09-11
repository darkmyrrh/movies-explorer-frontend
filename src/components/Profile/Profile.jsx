import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { nameValidation, emailValidation } from "../../utils/formValidationRules";

function Profile({ onUpdateUser, onExit, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation({});
    const nameErrorMessage = nameValidation(values.name);
    const emailErrorMessage = emailValidation(values.email);

    useEffect(() => {
      setValues({ name: currentUser.name, email: currentUser.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
  
  


  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
    resetForm();
    setIsSubmitVisible(false);
  }

  function enableEditing() {
    setIsSubmitVisible(true);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" noValidate>
        <label
          htmlFor="name"
          className={`profile__label ${
            errors.name && "profile__label_error"
          }`}
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
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value={values.name || currentUser.name || ""}
          />
        </label>
        <span className="profile__error-text">{nameErrorMessage}</span>
        <label
          htmlFor="email"
          className={`profile__label ${
            errors.email && "profile__label_error"
          }`}
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
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value={values.email || currentUser.email || ""}
          />
        </label>
        <span className="profile__error-text">{emailErrorMessage}</span>
      </form>
      {isSubmitVisible ? (
        <button
          type="submit"
          className={`profile__submit ${
            isValid ? "" : "profile__submit_disabled"
          }`}
          onClick={handleSubmit}
          disabled={isValid ? false : true}
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
