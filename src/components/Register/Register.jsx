import "./Register.css";
import { useState } from "react";
import AuthForm from "../AuthPage/AuthPage";

function Register({ onRegister }) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = () => {
    setIsSubmitDisabled(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
    setIsSubmitDisabled(true);
  };
  return (
    <main className="register">
      <AuthForm
        name="register"
        greetingText="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        linkText="Войти"
        page="/login"
        isDisabled={isSubmitDisabled}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="auth-page__form-label">
          Имя
          <input
            type="text"
            className="auth-page__form-input"
            name="name"
            placeholder="Имя"
            onChange={handleChange}
            value="name"
            required
          />
          <span className="auth-page__error-text"></span>
        </label>
        <label htmlFor="email" className="auth-page__form-label">
          E-mail
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            className="auth-page__form-input"
            onChange={handleChange}
            value="email"
            required
          />
          <span className="auth-page__error-text"></span>
        </label>
        <label htmlFor="password" className="auth-page__form-label">
          Пароль
          <input
            type="password"
            name="password"
            className="auth-page__form-input auth-page__form-input_error"
            placeholder="**************"
            onChange={handleChange}
            value="password"
            required
          />
          <span className="auth-page__error-text">Что-то пошло не так...</span>
        </label>
      </AuthForm>
    </main>
  );
}

export default Register;
