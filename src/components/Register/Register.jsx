import "./Register.css";
import AuthForm from "../AuthPage/AuthPage";
import { useFormWithValidation } from "../../hooks/useFormValidation";

function Register({ onRegister, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
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
        isValid={isValid}
      >
        <label htmlFor="name" className="auth-page__form-label">
          Имя
          <input
            type="text"
            className={`auth-page__form-input  ${
              errors.name && "auth-page__form-input_error"
            }`}
            name="name"
            id="name"
            placeholder="Имя"
            value={values.name || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            required
          />
          <span className="auth-page__error-text">{errors.name}</span>
        </label>
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
            required
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
            placeholder="Пароль"
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

export default Register;
