import { Detail } from "../Detail";
import { Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import HasAccess from "../HasAcces";
import AsyncData from "../AsyncData";

const MovieDetail = ({
  MOVIE,
  avgRating,
  userId,
  onDelete,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  let rating = avgRating?.rating;

  rating = rating >= 0 ? rating : -1;

  /*console.log("logged in user");
  console.log(userId);
  console.log("movie added by user");
  console.log(MOVIE.userId);
*/

  const handleDelete = useCallback(async () => {
    try {
      await onDelete(MOVIE.movieId);

      navigate(`/movies`);
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }, [onDelete, MOVIE]);

  return (
    <>
      <AsyncData loading={loading} error={error}>
        <Detail
          title={MOVIE?.title}
          poster={MOVIE?.poster}
          rating={rating}
          genres={MOVIE?.genreMovies || []}
          text={MOVIE?.synopsis}
        />
        <HasAccess>
          {MOVIE?.userId === userId ? (
            <Box display="flex" alignItems="center">
              <Box ml={3} mr={2} />

              <Link>
                <DeleteIcon onClick={handleDelete} data-cy="movie_delete_btn" />
              </Link>
            </Box>
          ) : null}
        </HasAccess>
      </AsyncData>
    </>
  );
};

export default MovieDetail;
