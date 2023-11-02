import { useState } from "react";

import MovieList from "./components/movies/MovieList";
//import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div>
        <h2>Browse movies</h2>
        <MovieList />
      </div>
    </ChakraProvider>
  );
}

export default App;
