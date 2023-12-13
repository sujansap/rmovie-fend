import { Detail } from "../Detail";

const MovieDetail = ({ MOVIE, avgRating }) => {
  return (
    <Detail
      title={MOVIE.title}
      poster={MOVIE.poster}
      rating={avgRating.rating || -1}
      genres={MOVIE.genreMovies || []}
      text={MOVIE.synopsis}
    />
  );
};

export default MovieDetail;
