import { Detail } from "../Detail";

import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData";

const MovieDetail = () => {
  const { id } = useParams();
  const getFrom = `movies/${id}`;
  console.log("get from is " + getFrom);
  const { data: MOVIE = [], isLoading, error } = useSWR(getFrom, getAll);

  return (
    <Detail
      title={MOVIE.title}
      poster={MOVIE.poster}
      rating={10}
      genres={MOVIE.genreMovies || []}
      text={MOVIE.synopsis}
    />
  );
};

export default MovieDetail;
