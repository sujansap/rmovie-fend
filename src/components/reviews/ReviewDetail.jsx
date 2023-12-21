import { Detail } from "../Detail";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import { ReviewForm } from "./ReviewForm";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";

const defaultRating = 50;

const ReviewDetail = ({ mid, REVIEW, onDelete, mutate }) => {
  const handleDelete = useCallback(async () => {
    await onDelete(REVIEW?.reviewId);
    if (mutate) {
      mutate(""); //mid
    }
  }, [onDelete, REVIEW?.reviewId, mutate, mid]);

  if (REVIEW && Object.keys(REVIEW).length !== 0) {
    const { title, review, rating, poster } = REVIEW;
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
  }

  return <ReviewForm mid={mid} rating={defaultRating} mutate={mutate} />;
};

export default ReviewDetail;
