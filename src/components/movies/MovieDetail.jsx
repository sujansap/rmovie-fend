import { Detail } from "../Detail";
import { useMemo } from "react";

const MovieDetail = ({ MOVIE, avgRating }) => {
  let rating = avgRating.rating;
  rating = rating >= 0 ? rating : -1;
  return (
    <Detail
      title={MOVIE.title}
      poster={MOVIE.poster}
      rating={rating}
      genres={MOVIE.genreMovies || []}
      text={MOVIE.synopsis}
    />
  );
};

export default MovieDetail;
