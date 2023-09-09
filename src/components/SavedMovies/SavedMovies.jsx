import "./SavedMovies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMoviesList, onDeleteClick, savedMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);



  useEffect(() => {
    filterMoviesByDuration();
  }, [isShort]);

  function handleCheckBoxClick() {
    setIsShort(!isShort);
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
      const shortMovies = foundMovies.filter((movie) => movie.duration < 40);
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

  return (
    <main className="saved-movies">
      <SearchForm
        moviesList={savedMoviesList}
        onChange={handleCheckBoxClick}
        checked={isShort}
        handleChange={handleInputChange}
        inputValue={searchQuery}
        onSubmit={handleSearch}
      />
      <MoviesCardList
        cards={isSearched ? (isShort ? filteredMovies : foundMovies) : savedMovies}
        onDeleteClick={onDeleteClick}
        savedMovies={savedMovies}
        nothingFound={nothingFound}
      />
    </main>
  );
}

export default SavedMovies;
