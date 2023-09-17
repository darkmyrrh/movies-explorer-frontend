import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as MoviesApi from "../../utils/MoviesApi";
import useResize from "../../hooks/useResize";
import {
  CARDS_ON_XLARGE_SCREEN,
  CARDS_ON_LARGE_SCREEN,
  CARDS_ON_MEDIUM_SCREEN,
  CARDS_ON_SMALL_SCREEN,
  CARDS_TO_ADD_ON_XLARGE_SCREEN,
  CARDS_TO_ADD_ON_LARGE_SCREEN,
  CARDS_TO_ADD_ON_MEDIUM_SCREEN,
  CARDS_TO_ADD_ON_SMALL_SCREEN,
  SHORT_MOVIES_DURATION,
} from "../../utils/constants";

function Movies({ onLikeClick, savedMovies }) {
  const { isScreenXLarge, isScreenLarge, isScreenMedium, width } = useResize();
  const [isSearched, setIsSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("SavedCheckboxState")) || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [filteredMoviesNumber, setFilteredMoviesNumber] = useState(0);
  const [defaultCardsNumber, setDefaultCardsNumber] = useState(0);
  const [allCardsNumber, setAllCardsNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let initialCardsNumber;
    if (isScreenXLarge) {
      initialCardsNumber = CARDS_ON_XLARGE_SCREEN;
    } else if (isScreenLarge) {
      initialCardsNumber = CARDS_ON_LARGE_SCREEN;
    } else if (isScreenMedium) {
      initialCardsNumber = CARDS_ON_MEDIUM_SCREEN;
    } else {
      initialCardsNumber = CARDS_ON_SMALL_SCREEN;
    }
    setCardNumber(initialCardsNumber);
    setDefaultCardsNumber(initialCardsNumber);
  }, [width, isScreenLarge, isScreenXLarge, isScreenMedium]);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("SavedSearch"));
    const savedShortsSearch = JSON.parse(
      localStorage.getItem("SavedShortsSearch")
    );
    const savedCheckbox = JSON.parse(
      localStorage.getItem("SavedCheckboxState")
    );
    const savedSearchRequest = JSON.parse(
      localStorage.getItem("SearchRequest")
    );
    if (savedResults) {
      setIsSearched(true);
      setAllFoundMovies(savedResults);
      setAllCardsNumber(savedResults.length);
      setFoundMovies(savedResults.slice(0, cardNumber));
      setSearchQuery(savedSearchRequest);
      setIsShort(savedCheckbox);
      setFilteredMoviesNumber(savedShortsSearch.length);
      setFilteredMovies(savedShortsSearch.slice(0, cardNumber));
      setIsLoading(false);
      if (
        savedResults.length > cardNumber ||
        savedShortsSearch.length > cardNumber
      ) {
        setIsButtonVisible(true);

        if (isShort && filteredMovies.length >= filteredMoviesNumber) {
          setIsButtonVisible(false);
        }
      } else {
        setIsButtonVisible(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    foundMovies.length,
    filteredMovies.length,
    filteredMoviesNumber,
    cardNumber,
    allCardsNumber,
  ]);

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
    setIsSearched(true);
    setCardNumber(defaultCardsNumber);
    let results = [];
    if (searchQuery === "") {
      setErrorMessage("Нужно ввести ключевое слово");
      setIsLoading(false);
      setIsButtonVisible(false);
      setIsSearched(false);
    } else if (!movies.length) {
      setIsSearched(true);
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((data) => {
          setMovies(data);
          localStorage.setItem("InitialMoviesArray", JSON.stringify(data));
          setIsError(false);
          setErrorText("");
          results = data.filter((movie) => {
            return (
              movie.nameRU.toLowerCase().includes(searchQuery) ||
              movie.nameEN.toLowerCase().includes(searchQuery)
            );
          });
          if (results.length === 0) {
            setNothingFound(true);
          } else {
            setNothingFound(false);
          }
          setErrorMessage("");
          setAllCardsNumber(results.length);
          setAllFoundMovies(results);
          setFoundMovies(results.slice(0, cardNumber));
          setIsLoading(false);
          localStorage.setItem("SavedSearch", JSON.stringify(results));
          localStorage.setItem("SearchRequest", JSON.stringify(searchQuery));
          localStorage.setItem(
            "SavedShortsSearch",
            JSON.stringify(
              results.filter((movie) => movie.duration <= SHORT_MOVIES_DURATION)
            )
          );
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          setIsButtonVisible(false);
        });
    } else {
      results = movies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery) ||
          movie.nameEN.toLowerCase().includes(searchQuery)
        );
      });
      if (results.length === 0) {
        setNothingFound(true);
      } else {
        setNothingFound(false);
      }
      setErrorMessage("");
      setAllCardsNumber(results.length);
      setAllFoundMovies(results);
      setFoundMovies(results.slice(0, cardNumber));
      setIsLoading(false);
      localStorage.setItem("SavedSearch", JSON.stringify(results));
      localStorage.setItem("SearchRequest", JSON.stringify(searchQuery));
      localStorage.setItem("FoundCardsNumber", JSON.stringify(results.length));
      localStorage.setItem(
        "SavedShortsSearch",
        JSON.stringify(
          results.filter((movie) => movie.duration <= SHORT_MOVIES_DURATION)
        )
      );
    }
  }

  function filterMoviesByDuration() {
    if (isShort) {
      const shortMovies = allFoundMovies.filter(
        (movie) => movie.duration <= SHORT_MOVIES_DURATION
      );
      if (shortMovies.length === 0) {
        setFilteredMovies([]);
        setNothingFound(true);
      } else {
        setNothingFound(false);
        setFilteredMoviesNumber(shortMovies.length);
        setFilteredMovies(shortMovies.slice(0, cardNumber));
        if (shortMovies.length > cardNumber) {
          setIsButtonVisible(true);
          if (filteredMovies.length === filteredMoviesNumber) {
            setIsButtonVisible(false);
          }
        } else {
          setIsButtonVisible(false);
        }
      }
      localStorage.setItem("SavedShortsSearch", JSON.stringify(shortMovies));
    } else {
      setIsShort(false);
      if (foundMovies.length > 0) {
        setNothingFound(false);
        setFoundMovies(allFoundMovies.slice(0, cardNumber));
        if (allFoundMovies.length > cardNumber) {
          setIsButtonVisible(true);
        } else {
          setIsButtonVisible(false);
        }
      }
    }
    localStorage.setItem("SavedCheckboxState", JSON.stringify(isShort));
  }

  function handleLoadMoreButtonClick() {
    let additionalCards;
    if (isScreenXLarge) {
      additionalCards = CARDS_TO_ADD_ON_XLARGE_SCREEN;
    } else if (isScreenLarge) {
      additionalCards = CARDS_TO_ADD_ON_LARGE_SCREEN;
    } else if (isScreenMedium) {
      additionalCards = CARDS_TO_ADD_ON_MEDIUM_SCREEN;
    } else {
      additionalCards = CARDS_TO_ADD_ON_SMALL_SCREEN;
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
      {!isSearched ? null : isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          nothingFound={nothingFound}
          cards={isShort ? filteredMovies : foundMovies}
          onLikeClick={onLikeClick}
          savedMovies={savedMovies}
          isError={isError}
          errorText={errorText}
          isSearched={isSearched}
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
