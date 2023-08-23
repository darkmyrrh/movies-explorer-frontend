import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMoviesList, onDeleteClick }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={savedMoviesList} onDeleteClick={onDeleteClick} />
    </main>
  );
}

export default SavedMovies;
