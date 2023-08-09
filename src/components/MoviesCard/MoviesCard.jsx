import './MoviesCard.css';

function MoviesCard ({card, isLiked, onLikeClick}) {
   
    const likeButtonClassName = `movies-card__like-button ${
        isLiked && "movies-card__like-button_active"
      }`; 

    function handleLikeClick() {
        onLikeClick(card);
    }

    return (
    <article className="movies-card">
    <img
      src={card.image}
      alt={card.name}
      className="movies-card__image"
    />
    <h2 className="movies-card__title">{card.name}</h2>
    <button
      type="button"
      aria-label="Нравится"
      className={likeButtonClassName}
      onClick={handleLikeClick}
    ></button>
    <p className='movies-card__duration'>{card.duration}</p>
  </article>
)
}

export default MoviesCard;