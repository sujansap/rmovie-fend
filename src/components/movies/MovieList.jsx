import Movie from "./Movie";
import MOVIE_DATA from "../../data/mock_data";
import { useState } from "react";
const MovieList = () => {
  const [moviesToWatch, addMovieToWatch] = useState([]);

  const addToWatchList = (title, link, movieID) => {
    console.log(moviesToWatch);

    addMovieToWatch([...moviesToWatch, { title, link, movieID }]);
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {MOVIE_DATA.map((movie) => (
            <Movie
              title={movie.title}
              genre={movie.genre}
              link={movie.link}
              key={movie.movieID}
              addToWatch={addToWatchList}
            />
          ))}
        </div>
      </div>
      <p>to watch movies</p>
      <br />
      <div className="container ">
        <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {moviesToWatch.map((movie) => (
            <Movie title={movie.title} link={movie.link} key={movie.movieID} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
