import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import InfoToolTip from "../InfoTooltip/InfoTooltip";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { MOVIES_BASE_URL } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setСurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [renderUserUpdateLoading, setRenderUserUpdateLoading] = useState(false);
  const [renderUserRegisterLoading, setRenderUserRegisterLoading] =
    useState(false);
  const [renderUserLoginLoading, setRenderUserLoginLoading] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleTokenCheck = () => {
    MainApi.checkToken()
      .then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate(
            JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}")
          );
          window.onbeforeunload = () => {
            window.sessionStorage.setItem(
              "lastRoute",
              JSON.stringify(window.location.pathname)
            );
          };
        } else {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = (name, email, password) => {
    setRenderUserRegisterLoading(true);
    MainApi.register(name, email, password)
      .then((res) => {
        setInfoToolTipOpen(true);
        setRegistrationSuccessful(true);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setInfoToolTipOpen(true);
        setRegistrationSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setRenderUserRegisterLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    setRenderUserLoginLoading(true);
    if (!email || !password) {
      return;
    }
    MainApi.authorize(email, password)
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setLoggedIn(false);
      })
      .finally(() => {
        setRenderUserLoginLoading(false);
      });
  };

  function handleUpdateUser(data) {
    setRenderUserUpdateLoading(true);
    MainApi.changeUserDetails(data)
      .then((info) => {
        setСurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderUserUpdateLoading(false);
      });
  }

  const handleLogout = () => {
    MainApi.signout().then(() => {
      setLoggedIn(false);
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        MainApi.getUserDetails(),
        MainApi.getSavedMovies(),
        MoviesApi.getMovies(),
      ])
        .then(([userInfo, savedMovies, movies]) => {
          setMovies(movies);
          setSavedMovies(savedMovies);
          setСurrentUser(userInfo);
          console.log(savedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLikeClick(movie) {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isMovieSaved) {
      MainApi.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: MOVIES_BASE_URL + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
        })
        .catch((err) => console.log(err));
    } else {
      handleDeleteSavedMovie(movie);
    }
  }

  function handleDeleteSavedMovie(movie) {
    MainApi.deleteMovie(movie._id).then(() => {
      setSavedMovies((state) =>
        state.filter((item) => {
          return item._id !== movie._id;
        })
      );
    });
  }

  function closeInfoToolTip() {
    setInfoToolTipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isSuccessful={isRegistrationSuccessful}
          onClose={closeInfoToolTip}
        />
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Header loggedIn={loggedIn} isVisible={false} />
                <NotFound />
                <Footer isVisible={false} />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header loggedIn={loggedIn} isVisible={false} />
                <Register
                  onRegister={handleRegister}
                  isLoading={renderUserRegisterLoading}
                />
                <Footer isVisible={false} />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header loggedIn={loggedIn} isVisible={false} />
                <Login
                  onLogin={handleLogin}
                  isLoading={renderUserLoginLoading}
                />
                <Footer isVisible={false} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} isVisible={true} />
                <Main />
                <Footer isVisible={true} />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={
                  <>
                    <Header loggedIn={loggedIn} isVisible={true} />
                    <Movies
                      moviesList={movies}
                      onLikeClick={handleLikeClick}
                      savedMovies={savedMovies}
                    />
                    <Footer isVisible={true} />
                  </>
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={
                  <>
                    <Header loggedIn={loggedIn} isVisible={true} />
                    <SavedMovies
                      savedMoviesList={savedMovies}
                      savedMovies={savedMovies}
                      onDeleteClick={handleDeleteSavedMovie}
                    />
                    <Footer isVisible={true} />
                  </>
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={
                  <>
                    <Header loggedIn={loggedIn} isVisible={true} />
                    <Profile
                      onExit={handleLogout}
                      onUpdateUser={handleUpdateUser}
                      isLoading={renderUserUpdateLoading}
                    />
                    <Footer isVisible={false} />
                  </>
                }
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
