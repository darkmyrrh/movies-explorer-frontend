import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ moviesList, isLiked, onLikeClick, savedMovies }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        cards={moviesList}
        isLiked={isLiked}
        onLikeClick={onLikeClick}
        savedMovies={savedMovies}
      />
      <Preloader />
    </main>
  );
}

export default Movies;
