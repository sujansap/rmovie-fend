import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import SmallNavBar from "../../../components/SmallNavBar";
import ReviewDetail from "../../../components/reviews/ReviewDetail";

//rename this to Reviewpage
const Reviewinfo = () => {
  const { id } = useParams();
  const [forceRender, setForceRender] = useState(false);
  return (
    <Box bg="gray.50" margin={5} padding={5} rounded="md" boxShadow="xl">
      <SmallNavBar id={id} activeReview={true} />
      <Box>
        <ReviewDetail mid={id} setForceRender={setForceRender} />
      </Box>
    </Box>
  );
};
export default Reviewinfo;
