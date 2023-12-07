import Movie from "./Movie";

import { useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import List from "../List";

const MovieList = () => {
  const { data: MOVIES = [], isLoading, error } = useSWR("movies", getAll);

  return (
    <AsyncData loading={isLoading} error={error}>
      <List MOVIES={MOVIES}></List>
    </AsyncData>
  );
};
export default MovieList;
