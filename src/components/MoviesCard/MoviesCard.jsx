import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard ({card, isLiked, onLikeClick, onDeleteClick}) {

    const location = useLocation();
   
    const likeButtonClassName = `movies-card__like-button ${
        isLiked && "movies-card__like-button_active"
      }`; 

    function handleLikeClick() {
        onLikeClick(card);
    }

    function handleDeleteClick () {
        onDeleteClick(card);
    }

    return (
    <article className="movies-card">
    <img
      src={card.image}
      alt={card.name}
      className="movies-card__image"
    />
    <h2 className="movies-card__title">{card.name}</h2>

    {location.pathname==='/movies' && (<button
      type="button"
      aria-label="Нравится"
      className={likeButtonClassName}
      onClick={handleLikeClick}
    />)}
    {location.pathname==='/saved-movies' && (<button
      type="button"
      aria-label="Удалить"
      className='movies-card__delete-button'
      onClick={handleDeleteClick}
    />)}
    <p className='movies-card__duration'>{card.duration}</p>
  </article>
)
}

export default MoviesCard;