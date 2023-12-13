import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import SmallNavBar from "../../../components/SmallNavBar";
import ReviewDetail from "../../../components/reviews/ReviewDetail";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AsyncData from "../../../components/AsyncData";
import { getAll, deleteById } from "../../../api/index";
//rename this to Reviewpage
const Reviewinfo = () => {
  const { id } = useParams();

  const getReviewFrom = `movies/${id}/review`;
  const {
    data: REVIEW = [],
    isLoading,
    error,
    mutate,
  } = useSWR(getReviewFrom, getAll);

  const { trigger: deleteMovie, error: deleteError } = useSWRMutation(
    "reviews",
    deleteById
  );

  return (
    <>
      <AsyncData error={deleteError}></AsyncData>
      {/*no error from getAll, because don't wanna show error but the form*/}
      <Box margin={5} padding={5} rounded="md" boxShadow="xl">
        <SmallNavBar id={id} activeReview={true} />
        <Box>
          <ReviewDetail
            mid={id}
            REVIEW={REVIEW}
            onDelete={deleteMovie}
            mutate={mutate}
          />
        </Box>
      </Box>
    </>
  );
};
export default Reviewinfo;
