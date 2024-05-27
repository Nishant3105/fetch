import React,{useCallback} from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const deleteHandler=useCallback(async (id) => {
     props.onDeleteMovie(id)
  },[props])
  return (
    <li className={classes.movie} id={props.liId}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>deleteHandler(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
