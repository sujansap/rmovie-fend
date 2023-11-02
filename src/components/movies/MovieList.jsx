import Movie from "./Movie";
import MOVIE_DATA from "../../data/mock_data";
import { useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const MovieList = () => {
  const [moviesToWatch, addMovieToWatch] = useState([]);

  const addToWatchList = (title, link, movieID) => {
    console.log(moviesToWatch);

    addMovieToWatch([...moviesToWatch, { title, link, movieID }]);
  };

  return (
    <Box>
      <Container mt={4}>
        <Box
          display={{ base: "block", md: "grid" }}
          gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
        >
          {MOVIE_DATA.map((movie) => (
            <Movie
              title={movie.title}
              genre={movie.genre}
              link={movie.link}
              key={movie.movieID}
              addToWatch={addToWatchList}
            />
          ))}
        </Box>
      </Container>
      <Text fontSize="xl" mt={4}>
        To watch movies
      </Text>
      <Container mt={4}>
        <Box
          display={{ base: "block", md: "grid" }}
          gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
        >
          {moviesToWatch.map((movie) => (
            <Movie title={movie.title} link={movie.link} key={movie.movieID} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
export default MovieList;

/*
 <div>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {MOVIE_DATA.map((movie) => (
            <Movie
              title={movie.title}
              genre={movie.genre}
              link={movie.link}
              key={movie.movieID}
              addToWatch={addToWatchList}
            />
          ))}
        </div>
      </div>
      <p>to watch movies</p>
      <br />
      <div className="container ">
        <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {moviesToWatch.map((movie) => (
            <Movie title={movie.title} link={movie.link} key={movie.movieID} />
          ))}
        </div>
      </div>
      <Box
        w="200px" // Set the width
        h="200px" // Set the height
        bg="blue.200" // Set the background color
        p={4} // Set padding
        borderWidth="2px" // Set border width
        borderColor="blue.1000" // Set border color
        borderRadius="md" // Set border radius
      >
        This is a Chakra UI box.
      </Box>
      <Box
        w={{ base: "100%", md: "50%" }} // Set the width to 100% on small screens and 50% on medium screens
        p={{ base: 4, md: 8 }} // Set padding to 4 on small screens and 8 on medium screens
        bg="blue.200" // Set the background color
        borderWidth="2px" // Set border width
        borderColor="blue.1000" // Set border color
        borderRadius="md" // Set border radius
      >
        This is a responsive Chakra UI box.
      </Box>
    </div>

*/
