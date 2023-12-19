import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import SmallNavBar from "../../../components/SmallNavBar";
import ReviewDetail from "../../../components/reviews/ReviewDetail";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AsyncData from "../../../components/AsyncData";
import { getAll, deleteById, getById } from "../../../api/index";
//rename this to Reviewpage
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

  if (isLoading) {
    return <AsyncData error={error} isLoading={isLoading}></AsyncData>;
  }

  return (
    <>
      <AsyncData error={deleteError} isLoading={isLoading}>
        {/*no error from getAll, because don't wanna show error but the form*/}
        <Box margin={5} padding={5} rounded="md" boxShadow="xl">
          <SmallNavBar id={id} activeReview={true} />
          <ReviewDetail
            mid={id}
            REVIEW={REVIEW}
            onDelete={deleteMovie}
            mutate={mutate}
            loading={isLoading}
            error={error}
          />
        </Box>
      </AsyncData>
    </>
  );
};
export default Reviewinfo;
