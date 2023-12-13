import { Box, Text } from "@chakra-ui/react";
import Movie from "./movies/Movie";
import { memo } from "react";

const List = ({ MOVIES, linkToReview }) => {
  if (MOVIES.length === 0) {
    return (
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <Text>nothing here yet!</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
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
              linkToReview={linkToReview}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default memo(List);
