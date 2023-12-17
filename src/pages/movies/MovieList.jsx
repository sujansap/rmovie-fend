import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";

import ListWithSearch from "../../components/ListWithSearch";
const MovieList = () => {
  const { data: MOVIES = [], isLoading, error } = useSWR("movies", getAll);

  return (
    <>
      <AsyncData loading={isLoading} error={error}>
        <ListWithSearch MOVIES={MOVIES} />
      </AsyncData>
    </>
  );
};
export default MovieList;
