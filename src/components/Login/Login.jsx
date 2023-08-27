import "./Login.css";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import AuthForm from "../AuthPage/AuthPage";

function Login({ onLogin, isLoading }) {
  const [formData, setFormData] = useState({
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
    } 
    onLogin(formData.email, formData.password);
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
        isValid={isFormValid}
      >
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
            placeholder="******"
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

export default Login;
