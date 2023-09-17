import "./Login.css";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import AuthForm from "../AuthPage/AuthPage";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Login({ onLogin, isLoading, loggedIn }) {
  const location = useLocation();

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
    setIsInputDisabled(true);
    setIsSubmitDisabled(true);
  }

  if (loggedIn) {
    return <Navigate to="/movies" state={{ location }} replace />;
  }
  return (
    <main className="login">
      <AuthForm
        name="login"
        greetingText="Рады видеть!"
        buttonText={isLoading ? "Вход..." : "Войти"}
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        page="/register"
        onSubmit={handleSubmit}
        isValid={isValid}
        isSubmitDisabled={isSubmitDisabled}
      >
        <label htmlFor="email" className="auth-page__form-label">
          E-mail
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            className={`auth-page__form-input  ${
              errors.email && "auth-page__form-input_error"
            }`}
            value={values.email || ""}
            onChange={handleChange}
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            required
            disabled={isInputDisabled}
          />
          <span className="auth-page__error-text">{errors.email}</span>
        </label>
        <label htmlFor="password" className="auth-page__form-label">
          Пароль
          <input
            type="password"
            name="password"
            id="password"
            className={`auth-page__form-input  ${
              errors.password && "auth-page__form-input_error"
            }`}
            placeholder="******"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <span className="auth-page__error-text">{errors.password}</span>
        </label>
      </AuthForm>
    </main>
  );
}

export default Login;
