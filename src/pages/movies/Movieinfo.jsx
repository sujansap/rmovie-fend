import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import useSWR from "swr";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";

import MovieDetail from "../../components/movies/MovieDetail";
import SmallNavBar from "../../components/SmallNavBar";
import { useAuth } from "../../contexts/Auth.context";
import useSWRMutation from "swr/mutation";
const Movieinfo = () => {
  const { id } = useParams();
  const { user } = useAuth();
  console.log("LOGGED IN user");
  console.log(user.userId);

  const getFrom = `movies/${id}`;
  console.log("get from is " + getFrom);
  const { data: MOVIE = [], isLoading, error } = useSWR(getFrom, getAll);
  const { trigger: deleteMovie, error: deleteError } = useSWRMutation(
    "movies",
    deleteById
  );

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
          <MovieDetail
            MOVIE={MOVIE}
            avgRating={avgRating}
            userId={user.userId}
            onDelete={deleteMovie}
          />
        </Box>
      </Box>
    </>
  );
};
export default Movieinfo;
