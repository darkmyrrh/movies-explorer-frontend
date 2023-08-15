import "./Register.css";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({onRegister}) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  
  const handleChange = () => {    
    setIsSubmitDisabled(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
    setIsSubmitDisabled(true)
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
        <label htmlFor="name" className="auth-form__label">
          Имя
          <input
            type="text"
            className="auth-form__input"
            name="name"
            placeholder="Имя"
            onChange={handleChange}
            value="name"
          />
        </label>
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
            onChange={handleChange}
            value="password"
          />
        </label>
      </AuthForm>
    </main>
  );
}

export default Register;
