import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,updateMovies] = useState([])
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const getMoviesHandler = async () => {
    // fetch('https://swapi.dev/api/films').then(res=>res.json()).then(ans=>console.log(ans))
    let resp=await fetch('https://swapi.dev/api/films')
    if(resp)
    resp=await resp.json()
    if(resp)
    console.log(resp)
    updateMovies(resp.results)

    // try {
    //   let resp = await fetch('https://swapi.dev/api/films');
    //   if (resp.ok) {
    //     let data = await resp.json();
    //     console.log(data);
    //     updateMovies(data.results);
    //   }
    // } catch (error) {
    //   console.error('Error fetching films:', error);
    // }
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
