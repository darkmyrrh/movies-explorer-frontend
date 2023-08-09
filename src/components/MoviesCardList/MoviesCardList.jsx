import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, isLiked, onLikeClick}) {
  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__movies-grid">
        {cards.map((card) => (
          <MoviesCard 
          card={card}          
          isLiked={isLiked}
          onLikeClick={onLikeClick} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
