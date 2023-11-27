import { Detail } from "../Detail";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData";
import { ReviewForm } from "./ReviewForm";

const ReviewDetail = () => {
  const { id } = useParams();
  //user die aangemeld is, moet het later worden
  const getFrom = `users/1/movies/${id}/reviews`;
  const { data: REVIEW = [], isLoading, error } = useSWR(getFrom, getAll);
  const { title, review, rating, poster } = REVIEW;
  console.log("review data: " + review);

  if (!review) {
    console.log("no review found");
    return <ReviewForm />;
  }
  return (
    <Detail
      title={title}
      poster={poster}
      rating={rating}
      genres={[]}
      text={review}
    />
  );
};

export default ReviewDetail;
