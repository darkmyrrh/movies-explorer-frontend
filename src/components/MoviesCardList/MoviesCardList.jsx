import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  cards,
  onLikeClick,
  onDeleteClick,
  savedMovies,
  nothingFound,
}) {
  
  const cardElements = cards    
    .map((card, id) => (
      <MoviesCard
        key={id}
        card={card}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
        savedMovies={savedMovies}
      />
    ));

  return (
    <>
      {nothingFound ? (
        <span className="movies__not-found-error">Ничего не найдено</span>
      ) : (
        <ul className="movies-cardlist">{cardElements}</ul>
      )}
      ;
    </>
  );
}

export default MoviesCardList;
