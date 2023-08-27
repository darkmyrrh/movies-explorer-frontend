import "./Register.css";
import { useState } from "react";
import AuthForm from "../AuthPage/AuthPage";
import { useFormValidation } from "../../hooks/useFormValidation";

function Register({ onRegister, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    });
    if (isValid) {
      setIsFormValid(true);
    } else return;
    onRegister(formData.name, formData.email, formData.password);
  }

  return (
    <main className="register">
      <AuthForm
        name="register"
        greetingText="Добро пожаловать!"
        buttonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
        text="Уже зарегистрированы?"
        linkText="Войти"
        page="/login"
        onSubmit={handleSubmit}
        isValid={isFormValid}
      >
        <label htmlFor="name" className="auth-page__form-label">
          Имя
          <input
            type="text"
            className={`auth-page__form-input  ${
              errors.name.message && "auth-page__form-input_error"
            }`}
            name="name"
            id="name"
            placeholder="Имя"
            value={formData.name || ""}
            onChange={handleChange}
            required
            onBlur={onBlurInput}
          />
          <span className="auth-page__error-text">{errors.name.message}</span>
        </label>
        <label htmlFor="email" className="auth-page__form-label">
          E-mail
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            className={`auth-page__form-input  ${
              !!errors.email.message && "auth-page__form-input_error"
            }`}
            value={formData.email || ""}
            onChange={handleChange}
            required
            onBlur={onBlurInput}
          />
          <span className="auth-page__error-text">{errors.email.message}</span>
        </label>
        <label htmlFor="password" className="auth-page__form-label">
          Пароль
          <input
            type="password"
            name="password"
            id="password"
            className={`auth-page__form-input  ${
              !!errors.password.message && "auth-page__form-input_error"
            }`}
            placeholder="Пароль"
            value={formData.password || ""}
            onChange={handleChange}
            required
            onBlur={onBlurInput}
          />
          <span className="auth-page__error-text">
            {errors.password.message}
          </span>
        </label>
      </AuthForm>
    </main>
  );
}

export default Register;
