import { Detail } from "../Detail";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import { ReviewForm } from "./ReviewForm";
import { Button, Box } from "@chakra-ui/react";

import AsyncData from "../AsyncData";

const ReviewDetail = ({ setForceRender }) => {
  console.log("RRRENDER REVIEWDETAIL");
  const { id } = useParams();

  const getFrom = `movies/${id}/review`;
  const { data: REVIEW = [], isLoading, error } = useSWR(getFrom, getAll);

  const { trigger: deleteMovie, error: deleteError } = useSWRMutation(
    "reviews",
    deleteById
  );
  const { title, review, rating, poster, reviewId } = REVIEW;
  console.log("review data: " + review);

  const defaultRating = 50;

  const handleDelete = async () => {
    try {
      await deleteMovie(reviewId);
      setForceRender(true);
    } catch (error) {
      console.error("Error deleting review", error);
    }
  };

  if (!review) {
    console.log("empty review form user will fill in everything");
    return (
      <ReviewForm
        mid={id}
        rating={defaultRating}
        setForceRender={setForceRender}
      />
    );
  }
  return (
    <>
      <AsyncData loading={isLoading} error={error || deleteError}>
        <Detail
          title={title}
          poster={poster}
          rating={rating}
          genres={[]}
          text={review}
        />
        <Box display="flex" alignItems="center">
          <Link to={`/movies/${id}/review/edit`}>
            <EditIcon />
          </Link>

          {/* Use Box with margin for space */}
          <Box ml={3} mr={2} />

          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Box>
      </AsyncData>
    </>
  );
};

export default ReviewDetail;
