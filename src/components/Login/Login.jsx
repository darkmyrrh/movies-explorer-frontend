import "./Login.css";
import { useState } from "react";
import AuthForm from "../AuthPage/AuthPage";

function Login({ onLogin }) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = () => {
    setIsSubmitDisabled(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    setIsSubmitDisabled(true);
  };

  return (
    <main className="login">
      <AuthForm
        name="login"
        greetingText="Рады видеть!"
        buttonText="Войти"
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        page="/register"
        isDisabled={isSubmitDisabled}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="auth-page__form-label">
          E-mail
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            className="auth-page__form-input"
            onChange={handleChange}
            value="email"
            required
          />
        </label>
        <label htmlFor="password" className="auth-page__form-label">
          Пароль
          <input
            type="password"
            name="password"
            id="password"
            className="auth-page__form-input"
            placeholder="******"
            value="password"
            required
          />
        </label>
      </AuthForm>
    </main>
  );
}

export default Login;
