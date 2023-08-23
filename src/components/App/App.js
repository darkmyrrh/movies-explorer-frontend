import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import MoviesList from "../utils/MoviesList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const SavedMoviesList = MoviesList.slice(0, 3);

  function handleRegister() {
    navigate("/login", { replace: true });
  }

  function handleLogin() {
    setLoggedIn(true);
    navigate("/movies", { replace: true });
  }

  function handleLogout() {
    navigate("/", { replace: true });
    setLoggedIn(false);
  }

  return (
    <div className="app">
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
            <>
              <Header loggedIn={true} isVisible={true} />
              <Movies moviesList={MoviesList} />
              <Footer isVisible={true} />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header loggedIn={true} isVisible={true} />
              <SavedMovies savedMoviesList={SavedMoviesList} />
              <Footer isVisible={true} />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={true} isVisible={true} />
              <Profile onExit={handleLogout} />
              <Footer isVisible={false} />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header loggedIn={false} isVisible={false} />
              <Register onRegister={handleRegister} />
              <Footer isVisible={false} />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header loggedIn={false} isVisible={false} />
              <Login onLogin={handleLogin} />
              <Footer isVisible={false} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
