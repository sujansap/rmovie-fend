import { ReviewForm } from "../../../components/reviews/ReviewForm";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../../components/AsyncData";

export default function ReviewEdit() {
  const { id } = useParams();
  const getFrom = `movies/${id}/review`;
  const { data: REVIEW, isLoading, error } = useSWR(getFrom, getById);

  return (
    <AsyncData loading={isLoading} error={error}>
      <ReviewForm mid={id} REVIEW={REVIEW}></ReviewForm>
    </AsyncData>
  );
}
