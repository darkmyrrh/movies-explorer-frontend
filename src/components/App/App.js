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

 const SavedMoviesList = [];
 const [savedMovies, setSavedMovies] = useState([]);
 function handleLikeButtonClick(card) {
  const isLiked = SavedMoviesList.find(val => val.name === card.name);
    if (!isLiked) {
      SavedMoviesList.push(card);
      console.log(SavedMoviesList);
      localStorage.setItem('savedMovies', JSON.stringify(SavedMoviesList));
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')))
    }
    else {
      handleDeleteClick(card);
    }
    
  }

  function handleDeleteClick(card) {
    const updatedSavedMoviesList = SavedMoviesList.filter((item) => item.name !== card.name);
    setSavedMovies(updatedSavedMoviesList);
  }

  function handleRegister() {
    navigate("/login", { replace: true });
  }

  function handleLogin () {
    setLoggedIn(true);
    navigate("/movies", { replace: true });
  }


  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={true} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header loggedIn={true} />
              <Movies
              moviesList={MoviesList}
              onLikeClick={handleLikeButtonClick}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <SavedMovies
              savedMoviesList={savedMovies}
              onDeleteClick={handleDeleteClick} 
               />
              <Footer />
            </>
            
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Profile />
            </>
            
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register onRegister={handleRegister}/>
            </>
            
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login onLogin={handleLogin} />
            </>
            
          }
        />
      </Routes>
    </div>
  );
}

export default App;
