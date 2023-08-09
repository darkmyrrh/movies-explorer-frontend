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
import MoviesList from "../utils/MoviesList";



function App() {
 const SavedMoviesList = [];

 function handleLikeButtonClick(card) {
  const isLiked = SavedMoviesList.find(val => val.name === card.name);
    if (!isLiked) {
      SavedMoviesList.push(card);
    }
    else {
      SavedMoviesList.pop(card);
    }
    localStorage.setItem('savedMovies', JSON.stringify(SavedMoviesList));
  }

const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));  

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header />
              <Movies
              moviesList={MoviesList}
              onLikeClick={handleLikeButtonClick} />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header />
              <SavedMovies
              savedMoviesList={savedMovies}
               />
              <Footer />
            </>
            
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
            
          }
        />
      </Routes>
    </div>
  );
}

export default App;
