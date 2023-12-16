import { Detail } from "../Detail";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import { ReviewForm } from "./ReviewForm";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { mutate as globalMutate } from "swr";

const defaultRating = 50;

const ReviewDetail = ({ mid, REVIEW, onDelete, mutate }) => {
  const { title, review, rating, poster, reviewId } = REVIEW;

  const handleDelete = useCallback(async () => {
    try {
      await onDelete(reviewId);
      if (mutate) {
        mutate(""); //mid

        /*globalMutate(`/api/movies/${mid}/rating`, undefined, {
          revalidateOnMount: true,
          shouldRetryOnError: true,
        });*/
        //mutate(ratingKey, undefined, { revalidate: 1 });
      }
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }, [onDelete, reviewId, mutate, mid]);

  if (!review) {
    return <ReviewForm mid={mid} rating={defaultRating} mutate={mutate} />;
  }

  return (
    <>
      <Detail
        title={title}
        poster={poster}
        rating={rating}
        genres={[]}
        text={review}
      />

      <Box display="flex" alignItems="center">
        <Link to={`/movies/${mid}/review/edit`}>
          <EditIcon />
        </Link>

        <Box ml={3} mr={2} />

        <Link>
          <DeleteIcon onClick={handleDelete} data-cy="review_delete_btn" />
        </Link>
      </Box>
    </>
  );
};

export default ReviewDetail;
