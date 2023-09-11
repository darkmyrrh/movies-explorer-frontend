import "./Login.css";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { emailValidation, passwordValidation } from "../../utils/formValidationRules";
import AuthForm from "../AuthPage/AuthPage";

function Login({ onLogin, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});
    const emailErrorMessage = emailValidation(values.email);
    const passwordErrorMessage = passwordValidation(values.password);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
    resetForm();
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
            required
          />
          <span className="auth-page__error-text">{emailErrorMessage}</span>
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
          <span className="auth-page__error-text">
            {passwordErrorMessage}
          </span>
        </label>
      </AuthForm>
    </main>
  );
}

export default Login;
