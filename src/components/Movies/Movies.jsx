import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as MoviesApi from "../../utils/MoviesApi";
import useResize from "../../hooks/useResize";

function Movies({ onLikeClick, savedMovies }) {
  const { isScreenXLarge, isScreenLarge, isScreenMedium, width } = useResize();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("SavedCheckboxState")) || false
  );
  const [isLoading, setIsLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [allCardsNumber, setAllCardsNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  function getInitialMovies() {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        localStorage.setItem("InitialMoviesArray", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    let initialCardsNumber;
    if (isScreenXLarge) {
      initialCardsNumber = 16;
    } else if (isScreenLarge) {
      initialCardsNumber = 12;
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
    const savedCheckbox = JSON.parse(
      localStorage.getItem("SavedCheckboxState")
    );
    const savedSearchRequest = localStorage.getItem("SearchRequest");
    if (!savedResults) {
      setIsLoading(true);
      return;
    }
    setFoundMovies(JSON.parse(savedResults).slice(0, cardNumber));
    setAllFoundMovies(JSON.parse(savedResults));
    setSearchQuery(JSON.parse(savedSearchRequest));
    setIsShort(savedCheckbox);
    setFilteredMovies(JSON.parse(savedShortsSearch));
    setIsLoading(false);
    if (
      savedResults.length > cardNumber ||
      savedShortsSearch.length > cardNumber
    ) {
      setIsButtonVisible(true);
      if (cardNumber >= allCardsNumber) {
        setIsButtonVisible(false);
      }
    } else {
      setIsButtonVisible(false);
    }
  }, [cardNumber, allCardsNumber]);

  useEffect(() => {
    filterMoviesByDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShort, searchQuery, nothingFound]);

  function handleCheckBoxClick(e) {
    setIsShort(e.target.checked);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value.toLowerCase());
  }

  function handleSearch() {
    if (searchQuery === "") {
      setErrorMessage("Введите ключевое слово для поиска");
      setIsLoading(true);
    }
    const results = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery)
      );
    });
    if (results.length === 0) {
      console.log(nothingFound);
      console.log(results.length);
    } else {
      setErrorMessage("");
      setAllCardsNumber(results.length);
      setAllFoundMovies(results);
      setFoundMovies(results.slice(0, cardNumber));
      setIsLoading(false);
      setNothingFound(false);
      localStorage.setItem("SavedSearch", JSON.stringify(results));
      localStorage.setItem("SearchRequest", JSON.stringify(searchQuery));
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
    } else {
      setNothingFound(false);
      setIsShort(false);
    }
    localStorage.setItem("SavedCheckboxState", JSON.stringify(isShort));
  }

  function handleLoadMoreButtonClick() {
    let additionalCards;
    if (isScreenXLarge) {
      additionalCards = 4;
    } else if (isScreenLarge) {
      additionalCards = 3;
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
        errorMessage={errorMessage}
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
