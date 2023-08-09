import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies ({ savedMoviesList }) {
    return (
        <main className='saved-movies'>
            <SearchForm />
            <MoviesCardList
            cards={savedMoviesList} />
        </main>
    )
}

export default SavedMovies;