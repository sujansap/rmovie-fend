import { useState } from "react";

import MovieList from "./components/movies/MovieList";
import MovieForm from "./components/movies/MovieForm";
import { Review } from "./components/reviews/Review";
import { ReviewForm } from "./components/reviews/ReviewForm";
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
        <ReviewForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
