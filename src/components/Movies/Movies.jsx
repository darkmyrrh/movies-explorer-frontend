import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as MoviesApi from "../../utils/MoviesApi";
import useResize from "../../hooks/useResize";

function Movies({ onLikeClick, savedMovies }) {
  const { isScreenLarge, isScreenMedium, isScreenSmall, width } = useResize();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [allCardsNumber, setAllCardsNumber] = useState(0);

  function getInitialMovies() {
    setIsLoading(true);
    MoviesApi.getMovies().then((data) => {
      setMovies(data);
      localStorage.setItem("InitialMoviesArray", JSON.stringify(data));
    });
  }

  useEffect(() => {
    let initialCardsNumber;
    if (isScreenLarge) {
      initialCardsNumber = 16;
    } else if (isScreenMedium) {
      initialCardsNumber = 8;
    } else {
      initialCardsNumber = 5;
    }
    setCardNumber(initialCardsNumber);
  }, [width]);

  useEffect(() => {
    getInitialMovies();
  }, []);
  useEffect(() => {
    const savedResults = localStorage.getItem("SavedSearch");
    const savedShortsSearch = localStorage.getItem("SavedShortsSearch");
    const savedCheckbox = localStorage.getItem("SavedCheckboxState");
    if (savedResults) {
      setFoundMovies(JSON.parse(savedResults).slice(0, cardNumber));
      setIsLoading(false);      
    }
    const savedSearchRequest = localStorage.getItem("SearchRequest");
    if (savedSearchRequest) {
      setSearchQuery(JSON.parse(savedSearchRequest));
    }
    
    if (savedCheckbox) {
      setIsShort(JSON.parse(savedCheckbox));
      setFilteredMovies(JSON.parse(savedShortsSearch));
    }
    if (savedResults.length > cardNumber || savedShortsSearch.length > cardNumber ) {
      setIsButtonVisible(true);
      if (cardNumber >= allCardsNumber) {
        setIsButtonVisible(false);
      }
    } else {
      setIsButtonVisible(false);
    }
  }, [cardNumber, allCardsNumber, nothingFound]);

  useEffect(() => {
    filterMoviesByDuration();
  }, [isShort, searchQuery, nothingFound]);

  function handleCheckBoxClick() {
    setIsShort(!isShort);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleSearch() {
    const results = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery)
      );
    });

    if (results.length === 0) {
      setNothingFound(true);
    } else {
      setAllCardsNumber(results.length);
      setFoundMovies(results.slice(0, cardNumber));
      setIsLoading(false);
      setNothingFound(false);
      localStorage.setItem("SavedSearch", JSON.stringify(results));
      localStorage.setItem("SearchRequest", JSON.stringify(searchQuery));      
      localStorage.setItem("SavedCheckboxState", JSON.stringify(isShort));
    }
  }

  function filterMoviesByDuration() {
    if (isShort) {
      const shortMovies = foundMovies.filter((movie) => movie.duration < 40);
      if (shortMovies.length === 0) {
        setFilteredMovies([]);
      } else {
        setNothingFound(false);
        setFilteredMovies(shortMovies);
      }
      localStorage.setItem("SavedShortsSearch", JSON.stringify(shortMovies));
    }
  }

  function handleLoadMoreButtonClick() {
    let additionalCards;
    if (isScreenLarge) {
      additionalCards = 4;
    } else if (isScreenMedium) {
      additionalCards = 2;
    } else {
      additionalCards = 1;
    }
    setCardNumber((prevState) => prevState + additionalCards);
  }

  return (
    <main className="movies">
      <SearchForm
        onChange={handleCheckBoxClick}
        checked={isShort}
        handleChange={handleInputChange}
        inputValue={searchQuery}
        onSubmit={handleSearch}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          nothingFound={nothingFound}
          cards={isShort ? filteredMovies : foundMovies}
          onLikeClick={onLikeClick}
          savedMovies={savedMovies}
        />
      )}
      {isButtonVisible && (
        <button
          type="button"
          className="movies__button app__button"
          onClick={handleLoadMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </main>
  );
}

export default Movies;
