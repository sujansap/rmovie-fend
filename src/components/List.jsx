import { Box, Text } from "@chakra-ui/react";
import Movie from "./movies/Movie";

const List = ({ MOVIES }) => {
  if (MOVIES.length === 0) {
    return (
      <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
        <Text>there are no movies yet</Text>
      </Box>
    );
  }
  return (
    <Box>
      <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
        <Box
          m={5}
          display={"grid"}
          gridTemplateColumns={{
            sm: "repeat(2, 1fr)",
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 10fr)",
          }}
          gap={4}
        >
          {MOVIES.map((movie) => (
            <Movie
              title={movie.title}
              genre={movie.genre}
              link={movie.poster}
              movieID={movie.movieId}
              key={movie.movieId}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default List;
