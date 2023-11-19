import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

import useSWR from "swr";
import { getAll } from "../../../api";
import AsyncData from "../../../components/AsyncData";
import { useParams } from "react-router-dom";
import { Review } from "../../../components/reviews/Review";
import { ReviewForm } from "../../../components/reviews/ReviewForm";
import MovieDetail from "../../../components/movies/MovieDetail";
import { useLocation } from "react-router-dom";
import SmallNavBar from "../../../components/SmallNavBar";
const Movieinfo = () => {
  const { id } = useParams();
  console.log(id);

  const { previousPath } = useLocation();

  console.log("the previous page: " + previousPath);
  //const getFrom = `movies/${id}/reviews`;
  //console.log(getFrom);
  //const { data: MOVIES = [], isLoading, error } = useSWR(getFrom, getAll);

  //console.log(MOVIES);
  return (
    <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
      <SmallNavBar id={id} activeMovie={true} />
      <Box>
        <MovieDetail />
      </Box>
    </Box>
  );
};
export default Movieinfo;
