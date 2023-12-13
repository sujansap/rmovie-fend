import { Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { memo } from "react";

const Movie = ({ title, link, movieID, linkToReview }) => {
  return (
    <Box borderWidth="1px" rounded="md" boxShadow="xl" p="3">
      <Box>
        <Box style={{ objectFit: "cover", width: "100%", height: "100%" }}>
          <Link to={`/movies/${movieID}${linkToReview ? "/review" : ""}`}>
            <Image
              src={link}
              alt="Card image cap"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              // style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Link>
          <Box mt={2} textAlign="center">
            <Text fontSize="lg">{title}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Movie);
