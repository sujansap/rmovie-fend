import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData";
import List from "../List";

const ReviewList = () => {
  const { data: REVIEWS = [], isLoading, error } = useSWR("reviews", getAll);
  console.log(REVIEWS);

  return (
    <AsyncData loading={isLoading} error={error}>
      <List MOVIES={REVIEWS} linkToReview={true}></List>
    </AsyncData>
  );
};
export default ReviewList;
