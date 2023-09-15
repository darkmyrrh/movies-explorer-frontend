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
  const [isLoading, setIsLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [allCardsNumber, setAllCardsNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  function getInitialMovies() {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        localStorage.setItem("InitialMoviesArray", JSON.stringify(data));
        setIsError(false);
        setErrorText("");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsButtonVisible(false);
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
  }, [width, isScreenLarge, isScreenXLarge, isScreenMedium]);

  // useEffect(() => {
  //   getInitialMovies();
  // }, []);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("SavedSearch"));
    const foundCardsNumber = JSON.parse(
      localStorage.getItem("FoundCardsNumber")
    );
    const savedShortsSearch = JSON.parse(
      localStorage.getItem("SavedShortsSearch")
    );
    const savedCheckbox = JSON.parse(
      localStorage.getItem("SavedCheckboxState")
    );
    const savedSearchRequest = JSON.parse(
      localStorage.getItem("SearchRequest")
    );
    setAllFoundMovies(savedResults);
    setAllCardsNumber(foundCardsNumber);
    setFoundMovies(savedResults.slice(0, cardNumber));
    setSearchQuery(savedSearchRequest);
    setIsShort(savedCheckbox);
    setFilteredMovies(savedShortsSearch);
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
    if (!movies.length) {
      setIsLoading(true);
      getInitialMovies();
    }
    const results = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery)
      );
    });
    if (searchQuery === "") {
      setErrorMessage("Введите ключевое слово для поиска");
      setIsLoading(false);
      setIsButtonVisible(false);
      return;
    }
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
      JSON.stringify(results.filter((movie) => movie.duration < 40))
    );
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

        if (shortMovies.length <= allCardsNumber) {
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
        }
      }
    }
    localStorage.setItem("SavedCheckboxState", JSON.stringify(isShort));
  }

  function handleLoadMoreButtonClick() {
    let additionalCards;
    if (isScreenXLarge) {
      additionalCards = 4;
    } else if (isScreenLarge) {
      additionalCards = 3;
    } else {
      additionalCards = 2;
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
          isError={isError}
          errorText={errorText}
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
