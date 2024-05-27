import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [error, setError] = useState('')
  const [retrying, setRetrying] = useState(true)


  const getMoviesHandler = useCallback(async () => {
    try {
      console.log('executed getMoviesHandler')
      let resp = await fetch('https://swapi.dev/api/films');
      if (!resp.ok) {
        throw new Error('Something went wrong!! Retrying...')
      }
      setLoading(true)
      let data = await resp.json();
      console.log(data);
      setLoading(false)
      setMovies(data.results);
    } catch (error) {
      // const id=setInterval(()=>{
      //   if(retrying)
      //     getMoviesHandler()
      // },5000)
      // localStorage.setItem('id',id)
      setisError(true)
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    getMoviesHandler()
  }, [getMoviesHandler])


  const cancelRetryingHandler = (e) => {
    e.preventDefault()
    // console.log('clicked cancel')
    // clearInterval(localStorage.getItem('id'))
    setisError(false)
    setRetrying(prevState => !prevState)
  }


  return (
    <React.Fragment>
      <section>
        {loading && !retrying && <h1>Loading... Please wait</h1>}
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isError && retrying && <><h1>Error Occurred: {error}</h1><button onClick={cancelRetryingHandler}>Cancel Retrying</button></>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
