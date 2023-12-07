import { Detail } from "../Detail";
import { EditIcon } from "@chakra-ui/icons";

import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData";
import { ReviewForm } from "./ReviewForm";

const ReviewDetail = () => {
  const { id } = useParams();
  //user die aangemeld is, moet het later worden
  const getFrom = `movies/${id}/review`;
  const { data: REVIEW = [], isLoading, error } = useSWR(getFrom, getAll);
  const { title, review, rating, poster } = REVIEW;
  console.log("review data: " + review);
  const defaultRating = 50;

  if (!review) {
    console.log("empty review form user will fill in everything");
    return <ReviewForm mid={id} rating={defaultRating} />;
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
      <Link to={`/movies/${id}/review/edit`}>
        <EditIcon />
      </Link>
    </>
  );
};

export default ReviewDetail;
