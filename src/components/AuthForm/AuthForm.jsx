import "./AuthForm.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function AuthForm({
  name,
  onSubmit,
  greetingText,
  children,
  buttonText,
  text,
  page,
  linkText,
  isDisabled
}) {
  return (
    <form className="auth-form" name={`${name}`} onSubmit={onSubmit}>
      <img src={logo} alt="Логотип" className="auth-form__logo" />
      <h1 className="auth-form__greeting">{greetingText}</h1>
      {children}
      <button
        type="submit"
        className={`auth-form__submit app__button ${isDisabled ? "auth-form__submit_disabled" : "" }`}
        disabled={isDisabled ? true : false}
      >{`${buttonText}`}</button>
      <p className="auth-form__paragraph">
        {text}{" "}
        <Link className="auth-form__link app__link" to={page}>
          {linkText}
        </Link>{" "}
      </p>
    </form>
  );
}

export default AuthForm;
