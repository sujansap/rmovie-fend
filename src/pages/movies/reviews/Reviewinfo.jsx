import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

import useSWR from "swr";
import { getAll } from "../../../api";
import AsyncData from "../../../components/AsyncData";
import { useParams } from "react-router-dom";
import { Review } from "../../../components/reviews/Review";
import { ReviewForm } from "../../../components/reviews/ReviewForm";
import MovieDetail from "../../../components/movies/MovieDetail";

import SmallNavBar from "../../../components/SmallNavBar";
import ReviewDetail from "../../../components/reviews/ReviewDetail";
const Reviewinfo = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
      <SmallNavBar id={id} activeReview={true} />
      <Box>
        <ReviewDetail />
      </Box>
    </Box>
  );
};
export default Reviewinfo;
