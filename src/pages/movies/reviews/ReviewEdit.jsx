import { ReviewForm } from "../../../components/reviews/ReviewForm";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll } from "../../../api";
import AsyncData from "../../../components/AsyncData";

export default function ReviewEdit() {
  const { id } = useParams();
  const getFrom = `movies/${id}/review`;
  const { data: REVIEW = [], isLoading, error } = useSWR(getFrom, getAll);
  const { review, rating, reviewId: rid } = REVIEW;

  return (
    <AsyncData loading={isLoading} error={error}>
      <ReviewForm
        mid={id}
        reviewText={review}
        rating={rating}
        rid={rid}
      ></ReviewForm>
    </AsyncData>
  );
}
