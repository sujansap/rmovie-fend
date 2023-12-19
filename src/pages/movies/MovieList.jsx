import useSWR from "swr";
import { getAll } from "../../api";

import ListWithSearch from "../../components/ListWithSearch";
const MovieList = () => {
  const { data: MOVIES = [], isLoading, error } = useSWR("movies", getAll);

  return <ListWithSearch MOVIES={MOVIES} loading={isLoading} error={error} />;
};
export default MovieList;
