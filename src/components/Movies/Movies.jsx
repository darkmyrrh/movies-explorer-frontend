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
  const [allFoundMovies, setAllFoundMovies] = useState([]);
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
    }).catch((err) => {
      console.log(err);
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
    const savedSearchRequest = localStorage.getItem("SearchRequest");
    if (savedResults && savedSearchRequest && savedCheckbox === true) {
      setFoundMovies(JSON.parse(savedResults).slice(0, cardNumber));
      setSearchQuery(JSON.parse(savedSearchRequest));
      setIsShort(JSON.parse(savedCheckbox));
      setFilteredMovies(JSON.parse(savedShortsSearch));
      setIsLoading(false);
      if (savedResults.length > cardNumber || savedShortsSearch.length > cardNumber ) {
        setIsButtonVisible(true);
        if (cardNumber >= allCardsNumber) {
          setIsButtonVisible(false);
        }
      } else {
        setIsButtonVisible(false);
      }
    }
    else {
      setIsLoading(true);
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
      setAllFoundMovies(results);
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
      const shortMovies = allFoundMovies.filter((movie) => movie.duration < 40);
      if (shortMovies.length === 0) {
        setFilteredMovies([]);
        setNothingFound(true);
      } else {
        setNothingFound(false);
        setFilteredMovies(shortMovies);
      }
      localStorage.setItem("SavedShortsSearch", JSON.stringify(shortMovies));
    }
    else {
      setNothingFound(false);
      setIsShort(false);
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
