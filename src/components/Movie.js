import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie} id={props.episode_id}>
      <h2>{props.title}</h2>
      <h3>{props.release_date}</h3>
      <p>{props.opening_text}</p>
    </li>
  );
};

export default Movie;
