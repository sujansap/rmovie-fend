import MovieForm from "../../components/movies/MovieForm";

import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
const AddMovie = () => {
  const {
    data: GENRES_DATA = [],
    isLoading,
    error: genreGetError,
  } = useSWR("movies/genres", getAll);

  return (
    <AsyncData error={genreGetError} loading={isLoading}>
      <MovieForm GENRES_DATA={GENRES_DATA} genreGetError={genreGetError} />
    </AsyncData>
  );
};

export default AddMovie;
