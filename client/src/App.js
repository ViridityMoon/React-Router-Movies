import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SavedList from './Movies/SavedList';

import { Switch, Route, Link } from 'react-router-dom';

import Movie from './Movies/Movie';
import MovieCard from './Movies/MovieCard'
import MovieList from './Movies/MovieList'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <div>Replace this Div with your Routes</div>
      <Route exact path='/' render = {props => <MovieList movies={movieList} {...props}/>}/>
      <Route path='/movies/:id' render = {props => <Movie {...props}/>}/>
    </div>
  );
};

export default App;
