import { Box, Text, Input, Button } from "@chakra-ui/react";

import { useState, useMemo } from "react";
import List from "./List";
const ListWithSearch = ({ MOVIES, linkToReview }) => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const filteredMovies = useMemo(
    () =>
      MOVIES.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase());
      }),
    [search, MOVIES]
  );

  if (MOVIES.length === 0) {
    return (
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <Text>nothing here yet!</Text>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Box rounded="md" display="flex" width="sm" marginLeft="auto" mr={3}>
          <Input
            type="search"
            id="search"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            data-cy="movies_search_input"
          />
          <Button
            bg="blue.500"
            color="white"
            type="button"
            onClick={() => setSearch(text)}
            data-cy="movies_search_btn"
            marginLeft={2}
          >
            Search
          </Button>
        </Box>
        <List MOVIES={filteredMovies} linkToReview={linkToReview} />
      </Box>
    </>
  );
};
export default ListWithSearch;
