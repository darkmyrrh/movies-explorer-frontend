import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_BASE_URL } from "../../utils/constants";

function MoviesCard({ card, onLikeClick, onDeleteClick, savedMovies }) {
  const location = useLocation();

  const isLiked = savedMovies.some((item) => item.movieId === card.id);



  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч. " + minutes + "м.";
  }

  return (
    <li>
      <article className="movies-card">
        {location.pathname === "/movies" && (
          <img
            src={`${MOVIES_BASE_URL}${card.image.url}`}
            alt={card.image.name}
            className="movies-card__image"
          />
        )}
        {location.pathname === "/saved-movies" && (
          <img
            src={card.image}
            alt={card.nameRU}
            className="movies-card__image"
          />
        )}
        <h2 className="movies-card__title">{card.nameRU}</h2>

        {location.pathname === "/movies" && (
          <button
            type="button"
            aria-label="Нравится"
            className={`movies-card__like-button app__button ${
              isLiked && "movies-card__like-button_active"
            }`}
            onClick={handleLikeClick}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            aria-label="Удалить"
            className="movies-card__delete-button app__button"
            onClick={handleDeleteClick}
          />
        )}
        <p className="movies-card__duration">
          {getTimeFromMins(card.duration)}
        </p>
      </article>
    </li>
  );
}

export default MoviesCard;
