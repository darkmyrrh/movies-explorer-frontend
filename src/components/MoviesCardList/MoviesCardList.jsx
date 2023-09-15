import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  cards,
  onLikeClick,
  onDeleteClick,
  savedMovies,
  nothingFound,
  isError,
  errorText,
}) {
  return (
    <>
      {isError ? (
        <span className="movies-cardlist__not-found-error">{errorText}</span>
      ) : nothingFound ? (
        <span className="movies-cardlist__not-found-error">
          Ничего не найдено
        </span>
      ) : (
        <ul className="movies-cardlist">
          {cards.map((card, id) => (
            <MoviesCard
              key={id}
              card={card}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
              savedMovies={savedMovies}
            />
          ))}
        </ul>
      )}
      ;
    </>
  );
}

export default MoviesCardList;
