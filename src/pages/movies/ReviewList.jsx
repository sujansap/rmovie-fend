import useSWR from "swr";
import { getAll } from "../../api";

import ListWithSearch from "../../components/ListWithSearch";

const ReviewList = () => {
  const { data: REVIEWS = [], isLoading, error } = useSWR("reviews", getAll);

  return (
    <ListWithSearch
      MOVIES={REVIEWS}
      linkToReview={true}
      loading={isLoading}
      error={error}
    />
  );
};
export default ReviewList;
