import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, isLiked, onLikeClick, onDeleteClick}) {
  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__movies-grid">
        {cards.map((card) => (
          <MoviesCard
          key={card._id}
          card={card}          
          isLiked={isLiked}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
