import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard ({card, onLikeClick, onDeleteClick}) {

    const location = useLocation();

    const [isLiked, setIsLiked] = useState(false);
   
    const likeButtonClassName = `movies-card__like-button app__button ${
        isLiked && "movies-card__like-button_active"
      }`; 

    function handleLikeClick() {
        onLikeClick(card);
        setIsLiked(!isLiked);
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
      className='movies-card__delete-button app__button'
      onClick={handleDeleteClick}
    />)}
    <p className='movies-card__duration'>{card.duration}</p>
  </article>
)
}

export default MoviesCard;