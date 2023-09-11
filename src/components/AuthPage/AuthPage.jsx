import "./AuthPage.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function AuthForm({
  name,
  greetingText,
  children,
  buttonText,
  text,
  page,
  linkText,
  isValid,
  onSubmit,
}) {
  const location = useLocation();
  const submitButtonClassName = `auth-page__submit app__button ${
    location.pathname === "/register"
      ? "auth-page__submit_type_register"
      : "auth-page__submit_type_login"
  } ${isValid ? "" : "auth-page__submit_disabled"}`;

  return (
    <section className="auth-page">
      <Link to="/">
        <img src={logo} alt="Логотип" className="auth-page__logo" />
      </Link>
      <h1 className="auth-page__greeting">{greetingText}</h1>
      <form className="auth-page__form" name={`${name}`} noValidate>
        {children}
      </form>
      <button
        type="submit"
        className={submitButtonClassName}
        onClick={onSubmit}
      >{`${buttonText}`}</button>
      <p className="auth-page__paragraph">
        {text}
        <Link className="auth-page__link app__link" to={page}>
          {linkText}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;
