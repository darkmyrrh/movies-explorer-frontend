import "./SavedMovies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIES_DURATION } from "../../utils/constants";

function SavedMovies({ savedMoviesList, onDeleteClick, savedMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    filterMoviesByDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShort]);

  function handleCheckBoxClick(e) {
    setIsShort(e.target.checked);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleSearch() {
    const results = savedMoviesList.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery)
      );
    });
    if (searchQuery === "") {
      setErrorMessage("Нужно ввести ключевое слово");
      setNothingFound(true);
      return;
    }
    setErrorMessage("");
    setIsSearched(true);
    if (results.length === 0) {
      setNothingFound(true);
    } else {
      setFoundMovies(results);
      setNothingFound(false);
    }
  }

  function filterMoviesByDuration() {
    if (isShort) {
      let shortMovies;
      if (isSearched) {
        shortMovies = foundMovies.filter(
          (movie) => movie.duration < SHORT_MOVIES_DURATION
        );
      } else {
        shortMovies = savedMovies.filter(
          (movie) => movie.duration < SHORT_MOVIES_DURATION
        );
      }
      if (shortMovies.length === 0) {
        setFilteredMovies([]);
        setNothingFound(true);
      } else {
        setNothingFound(false);
        setFilteredMovies(shortMovies);
      }
    } else {
      setNothingFound(false);
      setIsShort(false);
    }
  }

  function handleDeleteClick(movie) {
    if (isSearched) {
      setFoundMovies((state) =>
        state.filter((item) => {
          return item._id !== movie._id;
        })
      );
    }
    if (isShort) {
      setFilteredMovies((state) =>
        state.filter((item) => {
          return item._id !== movie._id;
        })
      );
    }
    onDeleteClick(movie);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        moviesList={savedMoviesList}
        onChange={handleCheckBoxClick}
        checked={isShort}
        handleChange={handleInputChange}
        inputValue={searchQuery}
        onSubmit={handleSearch}
        errorMessage={errorMessage}
      />
      <MoviesCardList
        cards={
          isSearched
            ? isShort
              ? filteredMovies
              : foundMovies
            : isShort
            ? filteredMovies
            : savedMovies
        }
        onDeleteClick={handleDeleteClick}
        savedMovies={savedMovies}
        nothingFound={nothingFound}
      />
    </main>
  );
}

export default SavedMovies;
