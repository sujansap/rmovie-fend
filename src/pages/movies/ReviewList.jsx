import useSWR from "swr";
import { getAll } from "../../api";

import AsyncData from "../../components/AsyncData";
import ListWithSearch from "../../components/ListWithSearch";

const ReviewList = () => {
  const { data: REVIEWS = [], isLoading, error } = useSWR("reviews", getAll);
  console.log(REVIEWS);

  return (
    <AsyncData loading={isLoading} error={error}>
      <ListWithSearch MOVIES={REVIEWS} linkToReview={true} />
    </AsyncData>
  );
};
export default ReviewList;
