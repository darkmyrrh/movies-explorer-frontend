import './InfoTooltip.css';
import { usePopupClose } from "../../hooks/usePopupClose.js";
import success from "../../images/success.svg";
import error from "../../images/error.svg";

function InfoToolTip({ isOpen, onClose, isSuccessful }) {
  usePopupClose(isOpen, onClose);
  const successRegistrationMessage = "Вы успешно зарегистрировались!";
  const failedRegistrationMessage = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <section className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}>
      <div className="tooltip__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="tooltip__close app__button"
          onClick={onClose}
        />
        <div className="tooltip__info">
          <img
            src={isSuccessful ? success : error}
            alt="Регистрация"
            className="tooltip__info-image"
          />
          <h2 className="tooltip__info-title">
            {isSuccessful ? successRegistrationMessage : failedRegistrationMessage}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
