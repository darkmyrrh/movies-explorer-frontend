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
import * as MainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setСurrentUser] = useState({});
  const [renderUserUpdateLoading, setRenderUserUpdateLoading] = useState(false);
  const [renderUserRegisterLoading, setRenderUserRegisterLoading] =
    useState(false);
  const [renderUserLoginLoading, setRenderUserLoginLoading] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [successMessage, setSuccessMesage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const navigate = useNavigate();

  const handleTokenCheck = () => {
    MainApi.checkToken()
      .then((res) => {
        if (res) {
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
          navigate("/", { replace: true });
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

  useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApi.getUserDetails(), MainApi.getSavedMovies()])
        .then(([userInfo, movies]) => {
          setСurrentUser(userInfo);
          const isOwn = movies.filter(
            (movie) => movie.owner._id === currentUser._id
          );
          setSavedMovies(isOwn);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, currentUser._id]);

  const handleRegister = (name, email, password) => {
    setRenderUserRegisterLoading(true);
    MainApi.register(name, email, password)
      .then((res) => {
        setInfoToolTipOpen(true);
        setSuccessMesage("Пользователь успешно зарегистрирован");
        setIsSuccessful(true);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setInfoToolTipOpen(true);
        setIsSuccessful(false);
        setFailedMessage(err.message);
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
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSuccessful(false);
        setFailedMessage(err.message);
        setLoggedIn(false);
      })
      .finally(() => {
        setRenderUserLoginLoading(false);
      });
  };

  function handleUpdateUser(name, email) {
    setRenderUserUpdateLoading(true);
    MainApi.changeUserDetails(name, email)
      .then((info) => {
        setСurrentUser(info.name, info.email);
        setInfoToolTipOpen(true);
        setSuccessMesage("Данные успешно изменены");
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSuccessful(false);
        setFailedMessage(err.message);
      })
      .finally(() => {
        setRenderUserUpdateLoading(false);
      });
  }

  const handleLogout = () => {
    MainApi.signout()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear("SavedSearch");
        localStorage.clear("SearchRequest");
        localStorage.clear("SavedCheckboxState");
        localStorage.clear("SavedShortsSearch");
        localStorage.clear("InitialMoviesArray");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);        
        setInfoToolTipOpen(true);
        setIsSuccessful(false);
        setFailedMessage(err.message);
      });
  };



  function handleLikeClick(movie) {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isMovieSaved) {
      MainApi.saveMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err)
          setInfoToolTipOpen(true);
          setIsSuccessful(false);
          setFailedMessage(err.message);
        })
        .finally(() => {          
          setInfoToolTipOpen(true)
          setIsSuccessful(true)
          setSuccessMesage("Фильм успешно добавлен");
        });
    } else {
      const savedMovie = savedMovies.find((item) => item.movieId === movie.id);
      handleDeleteSavedMovie(savedMovie);
    }
  }

  function handleDeleteSavedMovie(movie) {
    MainApi.deleteMovie(movie._id).then(() => {
      setSavedMovies((state) =>
        state.filter((item) => {
          return item._id !== movie._id;
        })
      );
      setInfoToolTipOpen(true)
          setIsSuccessful(true)
          setSuccessMesage("Фильм успешно удален");
    }).catch((err) => {
          console.log(err)
          setInfoToolTipOpen(true);
          setIsSuccessful(false);
          setFailedMessage(err.message);
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
          isSuccessful={isSuccessful}
          onClose={closeInfoToolTip}
          successMessage={successMessage}
          failedMessage={failedMessage}
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
                      savedMovies={savedMovies}
                      onLikeClick={handleLikeClick}
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
