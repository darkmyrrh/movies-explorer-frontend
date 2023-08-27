import "./Profile.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../hooks/useFormValidation";

function Profile({ onUpdateUser, onExit, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isSubmitVisible, setIsSubmitVisible] = useState(false);  
  const [isFormValid, setIsFormValid] = useState(false);

  const { validateFormData, onBlurInput, errors } = useFormValidation(formData);

  const handleChange = (e) => {
    const formField = e.target.name;
    const updatedFormData = {
      ...formData,
      [formField]: e.target.value,
    };
    if (errors[formField].focused) {
      setFormData({
        formData,
        errors,
        formField,
      });
      setIsFormValid(false);
    }
    setFormData(updatedFormData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { isValid } = validateFormData({
      formData,
      errors,
      applyInputFocused: true,
      isSubmitDisabled: false,
    });    if (isValid) {
      setIsFormValid(true);
    } else return
    onUpdateUser(formData.name, formData.email);
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
            errors.name.message && "profile__label_error"
          }`}
        >
          Имя
          <input
            type="text"
            placeholder={currentUser.name}
            className={`profile__input ${
              errors.name.message && "profile__input_error"
            }`}
            name="name"
            id="name"
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value={formData.name || currentUser.name || ""}
            onBlur={onBlurInput}
          />
        </label>
        {errors.name.message && (
          <span className="profile__error-text">{errors.name.message}</span>
        )}
        <label
          htmlFor="email"
          className={`profile__label ${
            !!errors.email.message && "profile__label_error"
          }`}
        >
          E-mail
          <input
            type="text"
            placeholder={currentUser.email}
            className={`profile__input ${
              !!errors.email.message && "profile__input_error"
            }`}
            name="email"
            id="email"
            disabled={isSubmitVisible ? false : true}
            required
            onChange={handleChange}
            value={formData.email || currentUser.email || ""}
            onBlur={onBlurInput}
          />
        </label>
        {!!errors.email.message && (
          <span className="profile__error-text">{errors.email.message}</span>
        )}
      </form>
      {isSubmitVisible ? (
        <button
          type="submit"
          className={`profile__submit ${
            isFormValid ? "" : "profile__submit_disabled"
          }`}
          onClick={handleSubmit}
          disabled={isFormValid ? false : true}
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
