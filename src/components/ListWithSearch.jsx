import { Box, Input, Button } from "@chakra-ui/react";

import { useState, useMemo } from "react";
import AsyncData from "./AsyncData";
import List from "./List";

import { useLanguage } from "../contexts/Language.context";

import translations from "../translation/translation";

const ListWithSearch = ({ MOVIES, linkToReview, loading, error }) => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const { language } = useLanguage();
  const filteredMovies = useMemo(
    () =>
      MOVIES.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase());
      }),
    [search, MOVIES]
  );

  return (
    <>
      <Box>
        <Box rounded="md" display="flex" width="sm" marginLeft="auto" mr={3}>
          <Input
            type="search"
            id="search"
            placeholder={translations[language].search}
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
            {translations[language].search}
          </Button>
        </Box>
        <AsyncData loading={loading} error={error}>
          <List
            MOVIES={filteredMovies}
            linkToReview={linkToReview}
            emptyMessage={translations[language].emptyList}
          />
        </AsyncData>
      </Box>
    </>
  );
};
export default ListWithSearch;
