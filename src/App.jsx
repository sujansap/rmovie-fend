import { useState } from "react";

import MovieList from "./components/movies/MovieList";
import MovieForm from "./components/movies/MovieForm";
import { Review } from "./components/reviews/Review";
//import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div>
        <h2>Browse movies</h2>
        <MovieList />
        <Box margin={3}>Add a movie</Box>
        <MovieForm />
        <Review />
      </div>
    </ChakraProvider>
  );
}

export default App;
