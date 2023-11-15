import { Link } from "react-router-dom";
import MovieList from "../../components/movies/MovieList";
import { Box } from "@chakra-ui/react";

const MovieView = () => {
  //add in main.jsx router and ...
  return (
    <Box>
      <MovieList />
    </Box>
  );
};
export default MovieView;
