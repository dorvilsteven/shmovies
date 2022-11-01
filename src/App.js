import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorite";
import RemoveFavorite from "./components/RemoveFavorite";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favs, setFavs] = useState([]);

  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=f7a086b2&s=${searchValue}`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };

  const saveToLocalStorage = (movies) => {
    localStorage.setItem('movie-app-favorites', JSON.stringify(movies))
  }
  const addFavMovie = (movie) => {
    const newFavList = [...favs, movie];
    setFavs(newFavList);
    saveToLocalStorage(newFavList);
  }

  const removeFav = (movie) => {
    const newFavList = favs.filter(
      (fav) => fav.imdbID !== movie.imdbID
    )
    setFavs(newFavList);
    saveToLocalStorage(newFavList);
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavs = JSON.parse(
      localStorage.getItem('movie-app-favorites')
    );
    setFavs(movieFavs);
  })

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Shmovies📽App' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div> 
      <div className="row d-flex flex-column">
          <h3>{searchValue}</h3>
          <div className="d-flex flex-row movie-list">
              <MovieList 
                movies={movies}
                favComponent={AddFavorite} 
                handleFavClick={addFavMovie} 
              />
          </div>
      </div>
      <div className="row d-flex flex-column">
          <h3>My List</h3>
          <div className="d-flex flex-row movie-list">
              <MovieList 
                movies={favs}
                favComponent={RemoveFavorite}
                handleFavClick={removeFav}
              />
          </div>
      </div>
    </div>
  )
};

export default App;