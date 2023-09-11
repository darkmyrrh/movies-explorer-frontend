import './InfoTooltip.css';
import { usePopupClose } from "../../hooks/usePopupClose.js";
import success from "../../images/success.svg";
import error from "../../images/error.svg";

function InfoToolTip({ isOpen, onClose, isSuccessful, successMessage, failedMessage }) {
  usePopupClose(isOpen, onClose);

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
            {isSuccessful ? successMessage : failedMessage}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
