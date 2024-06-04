import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import NewMovieForm from './components/NewMovieForm';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [error, setError] = useState('')
  const [retrying, setRetrying] = useState(true)


  const getMoviesHandler = useCallback(async () => {
    try {
      let resp = await fetch('https://react-http-109f0-default-rtdb.firebaseio.com/movies.json');
      if (!resp.ok) {
        throw new Error('Something went wrong!! Retrying...')
      }
      setLoading(true)
      let data = await resp.json(); // object of objects

      for (const key in data) {
        data[key].id = key
      }
      const loadedMovies = Object.values(data)
      setMovies(loadedMovies);
      setLoading(false)
    } catch (error) {
      setisError(true)
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    getMoviesHandler()
  }, [getMoviesHandler])

  useEffect(() => {
    if (isError) {
      clearInterval(interval)
      interval = setInterval(() => getMoviesHandler(), 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isError, getMoviesHandler])

  // export const retryFunction = async (promise, maxRetries, retryWait) => {
  //   let numberOfTries = 0;
  //   while (true) {
  //     try {
  //       const res = await promise;
  //       return res;
  //     } catch (err) {
  //       numberOfTries += 1;
  //          if (numberOfTries === maxRetries) {
  //         throw err;
  //       }

  //       await new Promise((resolve) => setTimeout(resolve, retryWait));
  //     }
  //   }
  // };


  const cancelRetryingHandler = useCallback((e) => {
    e.preventDefault()
    setisError(false)
    setRetrying(prevState => !prevState)
  }, [])

  const addNewMovie = useCallback(async (formData) => {
    const response = await fetch('https://react-http-109f0-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      const data = await response.json()
      setMovies([...movies, formData])
      console.log(data)
    }
  }, [movies])

  const deleteMovie = async (id) => {
    const response = await fetch(`https://react-http-109f0-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await response.json()
      const updatedMovies = movies.filter((movie) => movie.id !== id)
      setMovies(updatedMovies)
    }
  }


  return (
    <React.Fragment>
      <section>
        <NewMovieForm onAddNewMovie={addNewMovie} />
      </section>
      <section>
        {loading && !retrying && <h1>Loading... Please wait</h1>}
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isError && <h1>Error Occurred: {error}</h1>}
        {retrying && <button onClick={cancelRetryingHandler}>Cancel Retrying</button>}        <MoviesList movies={movies} onDeleteMovie={deleteMovie} />
      </section>
    </React.Fragment>
  );
}

export default App;
