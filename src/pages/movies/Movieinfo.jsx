import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import useSWR from "swr";
import { getAll, deleteById, getById } from "../../api";
import AsyncData from "../../components/AsyncData";

import MovieDetail from "../../components/movies/MovieDetail";
import SmallNavBar from "../../components/SmallNavBar";
import { useAuth } from "../../contexts/Auth.context";
import useSWRMutation from "swr/mutation";
import Error from "../../components/Error";
import Movie from "../../components/movies/Movie";
const Movieinfo = () => {
  const { id } = useParams();
  const { user } = useAuth();
  console.log("LOGGED IN user");

  const getFrom = `movies/${id}`;
  console.log("get from is " + getFrom);
  const {
    data: MOVIE,
    isLoading: isLoadingMovie,
    error: errorMovie,
  } = useSWR(getFrom, getById);

  const { trigger: deleteMovie, error: deleteError } = useSWRMutation(
    "movies",
    deleteById
  );

  const getRatingFrom = `movies/${id}/rating`;
  const {
    data: avgRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = useSWR(getRatingFrom, getById);

  return (
    <>
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <SmallNavBar id={id} activeMovie={true} />
        <Box>
          <MovieDetail
            MOVIE={MOVIE}
            avgRating={avgRating}
            userId={user?.userId}
            onDelete={deleteMovie}
            loading={isLoadingMovie}
            error={errorMovie}
          />
        </Box>
        <Box m={3}>
          <Error error={deleteError}></Error>
        </Box>
      </Box>
    </>
  );
};
export default Movieinfo;
