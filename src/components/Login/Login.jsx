import "./Login.css";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";


function Login({onLogin}) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  
  const handleChange = () => {
    
    setIsSubmitDisabled(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    setIsSubmitDisabled(true)
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
        <label htmlFor="email" className="auth-form__label">
          E-mail
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            className="auth-form__input"
            onChange={handleChange}
            value="email"
          />
        </label>
        <label htmlFor="password" className="auth-form__label">
          Пароль
          <input
            type="password"
            name="password"
            className="auth-form__input"
            placeholder="******"
            value="password"
          />
        </label>
      </AuthForm>
    </main>
  );
}

export default Login;