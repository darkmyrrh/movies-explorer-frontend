import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../hooks/useResize";

function MoviesCardList({ cards, isLiked, onLikeClick, onDeleteClick, savedMovies }) {
  const { isScreenLarge, isScreenMedium } = useResize();
  let num;
  function getCardsNumber() {
    if (isScreenLarge) {
      return (num = 16);
    } else if (isScreenMedium) {
      return (num = 8);
    } else {
      return (num = 5);
    }
  }
  const cardElements = cards
    .slice(0, getCardsNumber(num))
    .map((card) => (
      <MoviesCard
        key={card.id}
        card={card}
        isLiked={isLiked}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
        savedMovies={savedMovies}
      />
    ));

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__movies-grid">
        {cardElements}
      </ul>
    </section>
  );
}

export default MoviesCardList;
