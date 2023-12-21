import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import SmallNavBar from "../../../components/SmallNavBar";
import ReviewDetail from "../../../components/reviews/ReviewDetail";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AsyncData from "../../../components/AsyncData";
import { deleteById, getById } from "../../../api/index";

const Reviewinfo = () => {
  const { id } = useParams();

  const getReviewFrom = `movies/${id}/review`;
  const {
    data: REVIEW,
    isLoading,
    error,
    mutate,
  } = useSWR(getReviewFrom, getById);

  const { trigger: deleteMovie, error: deleteError } = useSWRMutation(
    "reviews",
    deleteById
  );

  return (
    <>
      {}

      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <SmallNavBar id={id} activeReview={true} />
        <AsyncData error={error} loading={isLoading}>
          <ReviewDetail
            mid={id}
            REVIEW={REVIEW}
            onDelete={deleteMovie}
            mutate={mutate}
          />
        </AsyncData>
      </Box>
    </>
  );
};
export default Reviewinfo;
