import Movie from "../../../components/movies/Movie";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

import useSWR from "swr";
import { getAll } from "../../../api";
import AsyncData from "../../../components/AsyncData";
import { useParams } from "react-router-dom";
import { Review } from "../../../components/reviews/Review";
import { ReviewForm } from "../../../components/reviews/ReviewForm";

const ReviewList = () => {
  const { id } = useParams();
  console.log(id);
  const getFrom = `movies/${id}/reviews`;
  console.log(getFrom);
  const { data: MOVIES = [], isLoading, error } = useSWR(getFrom, getAll);

  console.log(MOVIES);
  return (
    <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
      <Box>
        <Tabs variant="soft-rounded" colorScheme="blue" defaultIndex={1}>
          <TabList>
            <Tab>Movie Info</Tab>
            <Tab>Review</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Review />
            </TabPanel>
            <TabPanel>
              if you have made a review it will show up here, if you haven't
              then it will show forum to make the review
              <ReviewForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
export default ReviewList;
