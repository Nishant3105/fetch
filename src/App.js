import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([])
  const [loading,setLoading] = useState(false)

  const getMoviesHandler = async () => {
    // fetch('https://swapi.dev/api/films').then(res=>res.json()).then(ans=>console.log(ans))
    // let resp=await fetch('https://swapi.dev/api/films')
    // if(resp)
    // resp=await resp.json()
    // if(resp)
    // console.log(resp)
    // setMovies(resp.results)

    try {
      setLoading(true)
      let resp = await fetch('https://swapi.dev/api/films');
      if (resp.ok) {
        let data = await resp.json();
        console.log(data);
        setLoading(false)
        setMovies(data.results);
      }
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  }


  return (
    <React.Fragment>
      <section>
        {loading && <h1>Loading... Please wait</h1>}
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
