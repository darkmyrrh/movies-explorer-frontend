import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMoviesList, onDeleteClick, savedMovies }) {
  return (
    <main className="saved-movies">
      <SearchForm
        moviesList={savedMoviesList} />
      <MoviesCardList cards={savedMoviesList} onDeleteClick={onDeleteClick} savedMovies={savedMovies} />
    </main>
  );
}

export default SavedMovies;
