import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";

import MovieDetail from "../../components/movies/MovieDetail";
import SmallNavBar from "../../components/SmallNavBar";

const Movieinfo = () => {
  const { id } = useParams();
  const getFrom = `movies/${id}`;
  console.log("get from is " + getFrom);
  const { data: MOVIE = [], isLoading, error } = useSWR(getFrom, getAll);

  const getRatingFrom = `movies/${id}/rating`;
  const {
    data: avgRating = {},
    isLoadingRating,
    errorRating,
    mutateRating,
  } = useSWR(getRatingFrom, getAll);

  return (
    <>
      <AsyncData
        loading={isLoading || isLoadingRating}
        error={error || errorRating}
      ></AsyncData>
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <SmallNavBar id={id} activeMovie={true} />
        <Box>
          <MovieDetail MOVIE={MOVIE} avgRating={avgRating} />
        </Box>
      </Box>
    </>
  );
};
export default Movieinfo;
